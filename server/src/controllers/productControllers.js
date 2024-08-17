import { isValidObjectId } from "mongoose";
import { sendErrRes } from "../utils/helper.js";
import Product from "../models/Product.js";

export const addProduct = async (req, res) => {

  const {
    name,
    type,
    brief,
    specifications,
    variants,
    price,
    discount,
    shortcut,
    category,
  } = req.body;

  try {
    const newProduct = new Product({
      name,
      type,
      brief,
      specifications,
      variants,
      price,
      discount,
      shortcut,
      category,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Added new product!", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
};

export const getProductsByCollection = async (req, res) => {
  const { name } = req.params;

  try {
    let filteredProducts;
    if (name === "33-sale") {
      filteredProducts = await Product.find({ discount: { $gte: 0.33 } });
    } else if (name === "all") {
      filteredProducts = await Product.find({});
    } else {
      filteredProducts = await Product.find({ category: name });
    }

    res.status(201).json({ filteredProducts });
  } catch (error) {
    console.error("Error during get products:", error);
    res.status(500).json({ error: "Failed to get products" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).json({ products });
  } catch (error) {
    console.error("Error during get products:", error);
    res.status(500).json({ error: "Failed to get products" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    if (!isValidObjectId(id))
      return sendErrRes(res, "Invalid product id!", 422);
    const product = await Product.findById(id);

    if (!product) return sendErrRes(res, "Product not found!", 404);

    res.status(201).json({ product });
  } catch (error) {
    console.error("Error during get product:", error);
    res.status(500).json({ error: "Failed to get product" });
  }
};

export const getProductsBySearch = async (req, res) => {
  const searchQuery = req.query.name || "";

  if (searchQuery.trim() === "") {
    return res.status(200).json([]);
  }

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { brief: { $elemMatch: { $regex: searchQuery, $options: "i" } } },
      ],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error during get products:", error);
    res.status(500).json({ error: "Failed to get products" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    if (!isValidObjectId(id))
      return sendErrRes(res, "Invalid product id!", 422);

    const product = await Product.findByIdAndDelete(id);

    if (!product) return sendErrRes(res, "Product not found!", 404);

    res.status(201).json({ message: "Product deleted!" });
  } catch (error) {
    console.error("Error during delete product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productUpdates = req.body;

  try {
    if (!isValidObjectId(id))
      return sendErrRes(res, "Invalid product id!", 422);

    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({ message: "Product not found!" });

    Object.assign(product, productUpdates);

    const updatedProduct = await product.save();

    res
      .status(201)
      .json({ message: "Product updated!", product: updatedProduct });
  } catch (error) {
    console.error("Error during get product:", error);
    res.status(500).json({ error: "Failed to get product" });
  }
};
