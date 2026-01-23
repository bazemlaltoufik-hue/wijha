import Application from "../models/application.js";

const createApplication = async (req, res) => {
  const { jobSeekerId, jobOfferId, employerId } = req.body;

  try {
    const newApplication = new Application({
      jobSeekerId,
      jobOfferId,
      employerId,
    });
    await newApplication.save();
    res.status(201).json({
      message: "Application created successfully",
      application: newApplication,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getApplication = async (req, res) => {
  const { jobSeekerId, jobOfferId } = req.query;

  try {
    const application = await Application.findOne({ jobSeekerId, jobOfferId });
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ application });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getApplications = async (req, res) => {
  const { jobSeekerId, jobOfferId, page, limit } = req.query;

  try {
    const query = {};
    if (jobSeekerId) query.jobSeekerId = jobSeekerId;
    if (jobOfferId) query.jobOfferId = jobOfferId;

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const applications = await Application.find(query)
      .populate("jobSeekerId")
      .populate("jobOfferId")
      .populate("employerId")
      .skip(skip)
      .limit(pageSize);

    const totalcount = await Application.countDocuments(query);
    res.status(200).json({ applications, totalcount });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export { createApplication, getApplication, getApplications };
