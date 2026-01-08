import express from "express";
import { protect, restrictTo } from "../middlewares/authMiddleware.js";
import {
  adminCreateUser,
  adminGetAllUsers,
  adminGetUserById,
  adminHardDeleteUser,
  adminRestoreUser,
  adminUpdateUserById,
  deleteAccount,
  profile,
  updateProfile,
} from "../controllers/userController.js";
const router = express.Router();

router.get("/profile", protect, profile);
router.patch("/profile", protect, updateProfile);
router.delete("/profile", protect, deleteAccount);

//ADMIN ROUTES CAN BE ADDED HERE
router.get("/get-all-users", protect, restrictTo("admin"), adminGetAllUsers);
router.post("/create-user", protect, restrictTo("admin"), adminCreateUser)
router.patch("/update-user/:id", protect, restrictTo("admin"), adminUpdateUserById);
router.get("/get-user/:id", protect, restrictTo("admin"), adminGetUserById);
router.delete("/hard-delete-user/:id", protect, restrictTo("admin"), adminHardDeleteUser);
router.patch("/restore-user/:id", protect, restrictTo("admin"), adminRestoreUser);

export default router;
