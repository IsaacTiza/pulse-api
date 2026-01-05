import express from "express";
import { createUser, login } from "../controllers/userController.js";
const router = express.Router();

// Auth routes
router.post("/register", createUser);
router.post("/login", login);
router.get("/", (req, res) => {
  res.send("Welcome to pulse API");
});
router.post("/", (req, res) => {
    res.send(req.body)
})

export default router;
