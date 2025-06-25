import toggle_status_head from "../models/toggle_status.model.js";

export const changeToggleStatus = async (req, res) => {
  const { status } = req.body;

  try {
    // Find existing status document (assuming you only want one document)
    let statusDoc = await toggle_status_head.findOne();

    if (!statusDoc) {
      // Create new document if none exists
      statusDoc = new toggle_status_head({ isActive: status });
      await statusDoc.save();
    } else {
      statusDoc.isActive = status;
      await statusDoc.save();
    }

    res.status(200).json({
      success: true,
      data: statusDoc,
      message: `Toggle status ${
        statusDoc?.isActive === true ? "Active" : "Inactive"
      } Now`,
    });
  } catch (err) {
    console.error("Error updating the toggle status", err);
    res.status(500).json({
      success: false,
      error: "Server error",
      message: err.message,
    });
  }
};

export const getToggleStatus = async (req, res) => {
  try {
    // Find the status document (assuming single document)
    const statusDoc = await toggle_status_head.findOne();

    // If no document exists, return default false status
    if (!statusDoc) {
      return res.status(200).json({
        success: true,
        data: { isActive: false },
        message: "Default status (inactive) returned",
      });
    }

    // Create a simplified response object without metadata
    const responseData = {
      isActive: statusDoc.isActive,
    };

    res.status(200).json({
      success: true,
      data: responseData,
      message: `Status is currently ${
        statusDoc.isActive ? "Active" : "Inactive"
      }`,
    });
  } catch (err) {
    console.error("Error fetching toggle status", err);
    res.status(500).json({
      success: false,
      error: "Server error",
      message: err.message,
    });
  }
};
