import express from "express";
import { createUser, forgetPassword, login, passwordReset } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Auth routes
router.post("/register", createUser);
router.post("/login", login);
// router.post("/profile/password-reset", protect)
router.post("/forgot-password", forgetPassword);
router.post("/resetpassword/:resetToken", passwordReset);

router.get("/", (req, res) => {
  res.send("Welcome to pulse API");
});
router.post("/", (req, res) => {
    res.send(req.body)
})

export default router;
