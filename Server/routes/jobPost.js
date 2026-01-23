import express from "express";
import {
  createJobPost,
  getJobPost,
  getAllJobPosts,
  updateJobPost,
  getJobPostsByIds,
} from "../controllers/jobPost.js";
const router = express.Router();
import { verifyUser } from "../utils/verifyUser.js";

router.post("/create", verifyUser, createJobPost);
router.get("/getAllJobs", getAllJobPosts);
router.post("/getJobPostsByIds", getJobPostsByIds);
router.get("/:id", getJobPost);
router.put("/:id", updateJobPost);

export default router;
