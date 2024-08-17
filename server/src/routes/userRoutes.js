import express from "express";
import {
  addAddress,
  login,
  logout,
  register,
  getUser,
  updateAddress,
} from "../controllers/userControllers.js";
import validate from "../middleware/validator.js";
import { newUserSchema, signInSchema } from "../utils/validationSchema.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", validate(newUserSchema), register);
router.post("/login", validate(signInSchema), login);
router.post("/logout", logout);
router.get("/:id", getUser);
router.post("/address/:userId", verifyToken, addAddress);
router.put("/address/:userId/:address", verifyToken, updateAddress);

export default router;
