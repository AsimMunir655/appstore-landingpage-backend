import VersionHistory from "../models/version.model.js";

// Create a new version history record
export const createVersionHistory = async (req, res) => {
  const { version, date, message } = req.body;

  // Validate input
  if (!version || !date || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields (version, date, message) are required.",
    });
  }

  try {
    const newVersion = await VersionHistory.create({ version, date, message });

    return res.status(201).json({
      success: true,
      message: "Version created successfully.",
      data: newVersion,
    });
  } catch (error) {
    console.error("Error creating version:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating the version.",
    });
  }
};

// Get all version history records
export const getVersionHistory = async (req, res) => {
  try {
    const versions = await VersionHistory.find().sort({ date: -1 });

    return res.status(200).json({
      success: true,
      message: "All versions fetched successfully.",
      data: versions,
    });
  } catch (error) {
    console.error("Error fetching versions:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching versions.",
    });
  }
};
