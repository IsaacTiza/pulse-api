import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  deleteAccount,
  profile,
  updateProfile,
} from "../controllers/userController.js";
const router = express.Router();

router.get("/profile", protect, profile);
router.patch("/profile", protect, updateProfile);
router.delete("/profile", protect, deleteAccount);

export default router;
