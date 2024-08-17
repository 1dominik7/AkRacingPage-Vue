import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { addReview, getReview } from "../controllers/reviewControllers.js";

const router = express.Router();

router.post("/:productId", verifyToken, addReview);
router.get("/:productId", getReview);

export default router;
