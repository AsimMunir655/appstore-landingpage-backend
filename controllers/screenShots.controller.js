import screen_shot from "../models/screenshots.model.js";

// export const uploadScreenshots = async (req, res) => {
//   try {
//     const i_phone = req.files["i_phone"]?.map((file) => file.path) || [];
//     const i_pad = req.files["i_pad"]?.map((file) => file.path) || [];
//     const apple_watch =
//       req.files["apple_watch"]?.map((file) => file.path) || [];

//     const newRecord = new screen_shot({
//       i_phone,
//       i_pad,
//       apple_watch,
//     });

//     await newRecord.save();

//     res.status(201).json({
//       message: "Screenshots uploaded and saved successfully!",
//       data: newRecord,
//     });
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export const uploadScreenshots = async (req, res) => {
  try {
    const i_phone = req.files["i_phone"]?.map((file) => file.path) || [];
    const i_pad = req.files["i_pad"]?.map((file) => file.path) || [];
    const apple_watch =
      req.files["apple_watch"]?.map((file) => file.path) || [];

    // Find existing document (or create one if needed)
    let record = await screen_shot.findOne();

    if (!record) {
      // Create only once if no record exists
      record = new screen_shot({
        i_phone,
        i_pad,
        apple_watch,
      });
    } else {
      // Push new images to existing arrays
      record.i_phone.push(...i_phone);
      record.i_pad.push(...i_pad);
      record.apple_watch.push(...apple_watch);
    }

    await record.save();

    res.status(200).json({
      success: true,
      message: "Screenshots uploaded and saved successfully!",
      data: record,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getAllScreenshots = async (req, res) => {
  try {
    const screenshots = await screen_shot.findOne({});

    if (!screenshots) {
      return res.status(200).json({
        success: true,
        message: "No screenshots found",
        data: {
          i_phone: [],
          i_pad: [],
          apple_watch: [],
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        i_phone: screenshots.i_phone || [],
        i_pad: screenshots.i_pad || [],
        apple_watch: screenshots.apple_watch || [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch screenshots",
      error: error.message,
    });
  }
};
