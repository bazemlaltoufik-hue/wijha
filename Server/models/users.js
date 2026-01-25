import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["jobseeker", "employer", "admin"],
      required: true,
    },
  },
  { timestamps: true },
);

const companySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  industry: {
    type: String,
    required: true,
    enum: [
      "Technology & Digital",
      "Engineering & Technical",
      "Business & Corporate Services",
      "Sales, Marketing & Customer Service",
      "Industrial & Manufacturing",
      "Creative, Media & Design",
      "Healthcare & Life Sciences",
      "Education & Training",
      "Government & Public Sector",
      "Hospitality & Tourism",
      "Transportation & Logistics",
      "Energy & Environment",
      "Agriculture & Food",
      "Non-Profit & Community Services",
      "Others",
    ],
  },
  size: {
    type: String,
    required: true,
    enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"],
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  logo: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  description: {
    type: String,
  },
  mission: {
    type: Array,
  },
  foundingYear: {
    type: String,
  },
  website: {
    type: String,
  },
  registredName: {
    type: String,
  },
  legalForm: {
    type: String,
    enum: ["EI", "EURL", "SARL", "SPA", "SNC", "SCS", "SCPA"],
  },
  registredAdress: {
    type: String,
  },
  MainActivity: {
    type: String,
  },
  NIS: {
    type: String,
  },
  NIF: {
    type: String,
  },
  RC: {
    type: String,
  },
});

const jobSeekerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  professionalTitle: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  resume: {
    type: String,
  },
  experience: {
    type: [
      {
        title: String,
        company: String,
        from: Date,
        to: Date,
        description: String,
      },
    ],
  },
  experienceYears: {
    type: Number,
    default: 0,
  },
  education: {
    type: [
      {
        title: String,
        from: Date,
        to: Date,
        institution: String,
      },
    ],
  },
  CV: {
    type: String,
  },
  skills: {
    type: [String],
  },
  languages: {
    type: [{ name: String, proficiency: String }],
  },
  linkedIn: {
    type: String,
  },
  github: {
    type: String,
  },
  portfolio: {
    type: String,
  },
  saved: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "JobPost",
  },
  applications: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Application",
  },
});

export const User = mongoose.model("User", userSchema);
export const Company = mongoose.model("Company", companySchema);
export const JobSeeker = mongoose.model("JobSeeker", jobSeekerSchema);
