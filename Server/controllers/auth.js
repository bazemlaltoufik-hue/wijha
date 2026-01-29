import { User } from "../models/users.js";
import { JobSeeker } from "../models/users.js";
import { Company } from "../models/users.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const {
    email,
    password,
    role,
    firstName,
    lastName,
    address,
    phoneNumber,
    companyName,
    industry,
    size,
  } = req.body;

  if (role === "jobseeker") {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !address ||
      !phoneNumber
    ) {
      res
        .status(400)
        .json({ message: "All fields are required for job seekers." });
    }
  } else if (role === "employer") {
    if (!email || !password || !companyName || !industry || !size || !address) {
      res
        .status(400)
        .json({ message: "All fields are required for employers." });
    }
  } else {
    res.status(400).json({ message: "Invalid user role." });
  }

  let newUser;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();
    if (role === "jobseeker") {
      const newJobSeeker = new JobSeeker({
        userId: newUser._id,
        firstName,
        lastName,
        address,
        phoneNumber,
      });
      await newJobSeeker.save();
    } else if (role === "employer") {
      const newEmployer = new Company({
        userId: newUser._id,
        companyName,
        industry,
        size,
        address,
        phoneNumber,
      });
      await newEmployer.save();
    }
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.phoneNumber) {
      await User.findByIdAndDelete(newUser._id);
      return res.status(400).json({
        message: "Phone number already used",
      });
    }
    res.status(500).json(error.message);
  }
};

export const login = async (req, res, next) => {
  const { email, password, rememberMe } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Password or email is incorrect" });
    }
    const isPasswordValid = bcryptjs.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Password or email is incorrect." });
    }

    if (user.role === "jobseeker") {
      var userData = await JobSeeker.findOne({ userId: user._id });
    } else {
      var userData = await Company.findOne({ userId: user._id });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: rememberMe ? "7d" : "1d" },
    );

    const { password: pass, ...rest1 } = user._doc;

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        // secure: false,
        sameSite: "Lax",
        path: "/",
        maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
      })
      .json({
        ...rest1,
        ...userData._doc,
      });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        sameSite: "Lax",
        path: "/",
      })
      .json({ message: "Logged out successfully." });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (user.role === "jobseeker") {
      const jobSeekerData = await JobSeeker.findOne({ userId: id });
      return res.status(200).json({ ...user._doc, ...jobSeekerData._doc });
    } else if (user.role === "employer") {
      const companyData = await Company.findOne({ userId: id });
      return res.status(200).json({ ...user._doc, ...companyData._doc });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (user.role === "employer") {
      const { email: pass, ...rest } = updateData;
      const updatedCompany = await Company.findOneAndUpdate(
        { userId: id },
        rest,
        { new: true },
      );
      const updatedUser = await User.findByIdAndUpdate(
        { _id: id },
        {
          email: updateData.email || user.email,
        },
        { new: true },
      );
      return res
        .status(200)
        .json({ ...updatedCompany._doc, email: updatedUser.email });
    } else if (user.role === "jobseeker") {
      const { email: pass, ...rest } = updateData;
      const updatedJobSeeker = await JobSeeker.findOneAndUpdate(
        { userId: id },
        rest,
        { new: true },
      );
      const updatedUser = await User.findByIdAndUpdate(
        { _id: id },
        {
          email: updateData.email || user.email,
        },
        { new: true },
      );
      return res
        .status(200)
        .json({ ...updatedJobSeeker._doc, email: updatedUser.email });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const isPasswordValid = bcryptjs.compareSync(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Current password is incorrect." });
    }
    const hashedNewPassword = bcryptjs.hashSync(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getUsers = async (req, res) => {
  try {
    const { search, address, language, skills, minExp } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ];
    }
    if (address) query.address = { $regex: address, $options: "i" };
    if (language) {
      query.languages = {
        $elemMatch: {
          name: { $regex: new RegExp(`^${language}$`, "i") },
        },
      };
    }
    if (skills) query.skills = { $in: [skills] };
    if (minExp) query.experienceYears = { $gte: minExp };
    const users = await JobSeeker.find(query);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
