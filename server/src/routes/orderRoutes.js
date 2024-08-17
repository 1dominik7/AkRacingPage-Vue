import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createOrder,
  getOrder,
  getUserOrders,
} from "../controllers/orderControllers.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/user/:id", verifyToken, getUserOrders);
router.get("/order/:userId/:orderId", verifyToken, getOrder);

export default router;
