import mongoose from "mongoose";
import Product from "../models/Product.js";
import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  const { productId } = req.params;
  const { description, rate } = req.body;

  try {
    const review = new Review({
      rating: rate,
      comment: description,
      user: req.user._id,
      productId,
    });

    await review.save();

    const product = await Product.findById(productId);
    product.reviews.push(review._id);
    await product.save();

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error });
  }
};

export const getReview = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.aggregate([
      { $match: { productId: new mongoose.Types.ObjectId(productId) } },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 1,
          rating: 1,
          comment: 1,
          createdAt: 1,
          "user.firstName": 1,
          "user.lastName": 1,
        },
      },
    ]);

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error });
  }
};
