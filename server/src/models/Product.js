import mongoose from "mongoose";

const { Schema } = mongoose;
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    brief: {
      type: [String],
    },
    specifications: {
      material: {
        type: [String],
      },
      features: {
        type: [String],
      },
      general: { type: [String] },
    },
    variants: [
      {
        color: { type: String },
        imageUrls: { type: [String] },
        material: { type: String },
        stock: { type: Number, default: 1 },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    category: {
      type: [String],
    },
    shortcut: {
      type: String,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
