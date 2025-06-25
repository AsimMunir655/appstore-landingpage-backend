import App_Description from "../models/app_description.model.js";

export const getAppDescription = async (req, res) => {
  try {
    const description = await App_Description.findOne();
    return res.status(200).json({
      success: true,
      message: "Description found successfully",
      description,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateAppDescription = async (req, res) => {
  const { title, sections } = req.body;
  if (!sections) {
    return res.status(400).json({
      success: false,
      message: "section is required ",
    });
  }

  console.log("title & sections ", title, sections);
  try {
    const updated = await App_Description.findOneAndUpdate(
      {},
      { title, sections },
      { new: true, upsert: true }
    );
    return res.status(200).json({
      success: true,
      message: "Descriptoin updated successfully",
      updated,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
