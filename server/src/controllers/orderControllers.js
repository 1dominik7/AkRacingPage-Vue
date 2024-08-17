import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

export const createOrder = async (req, res) => {
  const orderInfo = req.body;
  console.log(orderInfo);
  const { email, cartItems } = orderInfo;

  let user = await User.findOne({ email });
  const products = cartItems.map((item) => ({
    product: item.id,
    quantity: item.quantity,
    variantId: item.variantId,
  }));

  try {
    const orderData = {
      products: products,
      totalPrice: orderInfo.totalPrice,
      discount: orderInfo.discount,
      shippingAddress: orderInfo.shippingAddress,
      email: email,
    };

    if (user) {
      orderData.user = user._id;
    }

    const order = new Order(orderData);
    await order.save();

    for (const item of products) {
      const { product, variantId, quantity } = item;

      await Product.findOneAndUpdate(
        { _id: product, "variants._id": variantId },
        { $inc: { "variants.$.stock": 0 - quantity } }
      );
    }

    res.status(200).json({ message: "Order created successfully!", order });
  } catch (error) {
    console.log("error creating order", error);
    res.status(500).json({ message: "Error creating orders" });
  }
};

export const getOrder = async (req, res) => {
  const { userId } = req.params;
  const { orderId } = req.params;

  try {
    const user = await User.findById(userId);
    const order = await Order.findById(orderId);

    if (userId !== order.user.toString() && !user.isAdmin)
      return sendErrRes(res, "You can't see this order", 422);

    if (!order) return sendErrRes(res, "Order not found!", 404);

    const finalOrder = await Order.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(orderId) } },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $addFields: {
          filteredVariants: {
            $filter: {
              input: "$productDetails.variants",
              as: "variant",
              cond: {
                $eq: [
                  { $toString: "$$variant._id" },
                  { $toString: "$products.variantId" },
                ],
              },
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          totalPrice: { $first: "$totalPrice" },
          discount: { $first: "$discount" },
          shippingAddress: { $first: "$shippingAddress" },
          email: { $first: "$email" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          products: {
            $push: {
              _id: "$products._id",
              product: "$products.product",
              variantId: "$products.variantId",
              quantity: "$products.quantity",
              productDetails: {
                _id: "$productDetails._id",
                name: "$productDetails.name",
                price: "$productDetails.price",
                filteredVariants: {
                  $map: {
                    input: "$filteredVariants",
                    as: "variant",
                    in: {
                      _id: "$$variant._id",
                      color: "$$variant.color",
                      material: "$$variant.material",
                      type: "$$variant.type",
                      imageUrls: "$$variant.imageUrls",
                    },
                  },
                },
              },
            },
          },
        },
      },
    ]);

    res.status(201).json({ order:finalOrder[0] });
  } catch (error) {
    console.error("Error during get order:", error);
    res.status(500).json({ error: "Failed to get order" });
  }
};

export const getUserOrders = async (req, res) => {
  const { id } = req.params;

  const userId = new mongoose.Types.ObjectId(id);

  if (!userId) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const userOrders = await Order.find({ id });

  if (!userOrders.length) {
    return res.status(200).json({ userOrders: [] });
  }

  try {
    const orders = await Order.aggregate([
      { $match: { user: userId } },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $addFields: {
          filteredVariants: {
            $filter: {
              input: "$productDetails.variants",
              as: "variant",
              cond: {
                $eq: [
                  { $toString: "$$variant._id" },
                  { $toString: "$products.variantId" },
                ],
              },
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          user: { $first: "$user" },
          totalPrice: { $first: "$totalPrice" },
          discount: { $first: "$discount" },
          shippingAddress: { $first: "$shippingAddress" },
          email: { $first: "$email" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          products: {
            $push: {
              _id: "$products._id",
              product: "$products.product",
              variantId: "$products.variantId",
              quantity: "$products.quantity",
              productDetails: {
                _id: "$productDetails._id",
                name: "$productDetails.name",
                price: "$productDetails.price",
                filteredVariants: {
                  $map: {
                    input: "$filteredVariants",
                    as: "variant",
                    in: {
                      _id: "$$variant._id",
                      color: "$$variant.color",
                      material: "$$variant.material",
                      type: "$$variant.type",
                      imageUrls: "$$variant.imageUrls",
                    },
                  },
                },
              },
            },
          },
        },
      },
    ]);

    if (orders.length === 0) {
      return res.status(404).json({ message: "User doesn't have orders yet" });
    }

    res.status(200).json({ userOrders: orders });
  } catch (error) {
    console.log("Error getting user's orders", error);
    res.status(500).json({ message: "Error getting user's orders" });
  }
};
