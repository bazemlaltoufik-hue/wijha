import express from "express";
import {
  getUser,
  login,
  register,
  updateUser,
  logout,
  updatePassword,
  getUsers,
} from "../controllers/auth.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/profiles", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.put("/password/:id", updatePassword);
router.get("/me/:id", getUser);
export default router;
