import app_info from "../models/app_info.model.js";

export const set_app_info = async (req, res) => {
  try {
    const { title, description, company } = req.body;
    const image = req.file?.path || "";

    const updatedApp = await app_info.findOneAndUpdate(
      {}, // condition (empty object means "first document found")
      {
        title,
        description,
        company,
        ...(image && { image }), // only set image if it's provided
      },
      {
        new: true, // return updated document
        upsert: true, // create if it doesn't exist
      }
    );

    res.status(200).json({
      success: true,
      message: "App info updated successfully",
      data: updatedApp,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const get_app_info = async (req, res) => {
  try {
    const data = await app_info.find();
    return res.status(200).json({
      success: true,
      message: "data retrieved successfully",
      data: data[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
