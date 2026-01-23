import express from "express";
import {
  getApplication,
  createApplication,
  getApplications,
} from "../controllers/application.js";
const router = express.Router();

router.post("/create", createApplication);
router.get("/get", getApplication);
router.get("/getall", getApplications);

export default router;
