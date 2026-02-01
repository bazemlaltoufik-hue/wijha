import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.js";
import jobPost from "./routes/jobPost.js";
import application from "./routes/application.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "https://wijha-1.onrender.com",
    credentials: true,
  }),
);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("database is connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", auth);
app.use("/api/jobPost", jobPost);
app.use("/api/application", application);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ succes: false, message });
});
