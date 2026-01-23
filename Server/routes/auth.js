import express from "express";
import {
  getUser,
  login,
  register,
  updateUser,
  logout,
} from "../controllers/auth.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.get("/me/:id", getUser);
export default router;
