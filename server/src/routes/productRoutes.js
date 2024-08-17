import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getProductsByCollection,
  getProductsBySearch,
  updateProduct,
} from "../controllers/productControllers.js";
import { verifyAdmin, verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, verifyAdmin, addProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.get("/collection/:name", getProductsByCollection);
router.get("/search/product/:name?", getProductsBySearch);
router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);
router.patch("/:id", verifyToken, verifyAdmin, updateProduct);

export default router;
