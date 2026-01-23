import { Company, User } from "../models/users.js";
import { JobPost } from "../models/jobPost.js";
export const createJobPost = async (req, res) => {
  const {
    title,
    description,
    location,
    jobType,
    workArrangement,
    industry,
    experienceLevel,
    educationLevel,
    numberOfPositions,
    deadline,
    salaryRange,
    state,
  } = req.body;

  const userData = await Company.findOne({ userId: req.user.userId });

  //   if (
  //     !userData.field ||
  //     !userData.companyName ||
  //     !userData.size ||
  //     !userData.logo ||
  //     !userData.description ||
  //     !userData.mission ||
  //     !userData.foundingYear ||
  //     !userData.links ||
  //     !userData.address ||
  //     !userData.phoneNumber
  //   ) {
  //     return res.status(400).json({
  //       message:
  //         "Please complete your company profile before creating a job post.",
  //     });
  //   }

  //   if (!userData.verified) {
  //     return res.status(400).json({
  //       message:
  //         "Your company account is not verified yet. You cannot create job posts.",
  //     });
  //   }

  try {
    const newJobPost = new JobPost({
      employerId: req.user.userId,
      employerIdInfo: userData._id,
      title,
      description,
      location,
      jobType,
      workArrangement,
      industry,
      experienceLevel,
      educationLevel,
      numberOfPositions,
      deadline,
      salaryRange,
      state,
    });

    await newJobPost.save();
    res
      .status(201)
      .json({ message: "Job post created successfully", jobPost: newJobPost });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getJobPost = async (req, res) => {
  const { id } = req.params;

  try {
    const jobPost = await JobPost.findById(id).populate("employerIdInfo");

    if (!jobPost) {
      return res.status(404).json({ message: "Job post not found" });
    }
    res.status(200).json(jobPost);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllJobPosts = async (req, res) => {
  const {
    createdBy,
    search,
    location,
    jobType,
    industry,
    experienceLevel,
    workArrangement,
    page,
    limit,
    state,
  } = req.query;

  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }
  query.state = state;
  if (createdBy) query.employerId = createdBy;
  if (location) query.location = location;
  if (jobType) query.jobType = jobType;
  if (industry) query.industry = industry;
  if (experienceLevel) query.experienceLevel = experienceLevel;
  if (workArrangement) query.workArrangement = workArrangement;

  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * pageSize;

  try {
    const jobPosts = await JobPost.find(query)
      .populate("employerIdInfo")
      .skip(skip)
      .limit(pageSize);
    const totalcount = await JobPost.countDocuments(query);
    console.log(jobPosts);
    res.status(200).json({ jobPosts, totalcount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getJobPostsByIds = async (req, res) => {
  const { ids } = req.body;

  try {
    const jobs = await JobPost.find({
      _id: { $in: ids },
    }).populate("employerIdInfo");
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateJobPost = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Fetch the existing job post to check current state
    const existingJobPost = await JobPost.findById(id);
    if (!existingJobPost) {
      return res.status(404).json({ message: "Job post not found" });
    }

    // Check if state is being updated from "Draft" to "In-review"
    if (existingJobPost.state === "Draft" && updates.state === "In-review") {
      // Get the deadline (either from updates or existing job post)
      const deadline = updates.deadline
        ? new Date(updates.deadline)
        : existingJobPost.deadline;

      // Check if deadline is greater than today
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

      if (deadline <= today) {
        return res.status(400).json({
          message:
            "Cannot update job post to In-review: The deadline must be greater than today.",
        });
      }
    }

    const updatedJobPost = await JobPost.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Job post updated successfully", updatedJobPost });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
