import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema(
  {
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employerIdInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Temporary"],
      required: true,
    },
    workArrangement: {
      type: String,
      enum: ["On-site", "Remote", "Hybrid"],
      required: true,
    },
    industry: {
      type: String,
      enum: [
        "Technology & IT",
        "Business & Finance",
        "Sales & Marketing",
        "Engineering",
        "Healthcare",
        "Education & Training",
        "Creative & Media",
        "Logistics & Supply Chain",
        "Retail & Customer Service",
        "Hospitality & Travel",
        "Manufacturing & Production",
        "Real Estate & Construction",
        "Legal",
        "Energy & Environment",
        "Government & Public Services",
        "Agriculture",
      ],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: [
        "Entry-level",
        "Mid-level",
        "Senior-level",
        "Director",
        "Executive",
      ],
      required: true,
    },
    educationLevel: {
      type: String,
      enum: [
        "High School",
        "Associate's Degree",
        "Bachelor's Degree",
        "Master's Degree",
        "Doctorate",
      ],
      required: true,
    },
    numberOfPositions: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    salaryRange: {
      type: String,
    },
    state: {
      type: String,
      enum: ["Draft", "In-review", "Published", "Rejected", "Closed", "Paused"],
      default: "In-review",
    },
    views: {
      type: Number,
      default: 0,
    },
    applicants: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const JobPost = mongoose.model("JobPost", jobPostSchema);
