import App_Description from "../models/app_description.model.js";
import app_info from "../models/app_info.model.js";
import Events_Group from "../models/events.model.js";
import events_toggle from "../models/events.toggle.model.js";
import reviews from "../models/review.model.js";
import screen_shot from "../models/screenshots.model.js";
import toggle_status_head from "../models/toggle_status.model.js";
import User from "../models/user.model.js";
import version_History from "../models/version.model.js";

export const get_All_Data_Web = async (req, res) => {
  const usersData = await User.find();
  const screen_shotsData = await screen_shot.find();
  const app_infoData = await app_info.find();
  const toggleStatus = await toggle_status_head.find({});
  const app_description = await App_Description.find({});
  const version_history = await version_History.find().sort({ date: -1 });
  const statusDoc = await events_toggle.findOne();
  const eventsData = await Events_Group.find({}, { events: 1, _id: 0 }); // only return `events` field
  const eventsOnly = eventsData[0].events;

  if (
    !usersData ||
    !screen_shotsData ||
    !app_infoData ||
    !toggleStatus ||
    !app_description ||
    !version_history ||
    !statusDoc
  ) {
    return res.status(400).json({
      success: false,
      message: "no data found ",
    });
  }
  ///////////////////////////////////
  const findReviews = await reviews.find().sort({ createdAt: -1 });

  // Get total number of reviews
  const totalCount = await reviews.countDocuments();

  // Calculate average rating
  const avgResult = await reviews.aggregate([
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
      },
    },
  ]);
  const averageRating = avgResult[0]?.averageRating || 0;

  // Count number of reviews for each rating (1 to 5)
  const ratingCounts = await reviews.aggregate([
    {
      $group: {
        _id: "$rating",
        count: { $sum: 1 },
      },
    },
  ]);

  // Format counts into an object like: { 5: 10, 4: 8, 3: 2, 2: 1, 1: 0 }
  const ratingDistribution = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  ratingCounts.forEach((item) => {
    ratingDistribution[item._id] = item.count;
  });

  try {
    return res.status(200).json({
      success: true,
      message: "all data found successfully",
      usersData: usersData[0],
      app_infoData: app_infoData[0],
      toggleStatus: toggleStatus[0],
      screen_shotsData: screen_shotsData[0],
      app_description: app_description[0],
      version_history: version_history,
      totalCount,
      averageRating: Number(averageRating.toFixed(1)),
      ratingDistribution,
      reviews: findReviews,
      eventsToggle: statusDoc,
      eventsOnly,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({});
  }
};

export const deleteScreenshot = async (req, res) => {
  try {
    const { device_type, index } = req.body;

    if (!["i_phone", "i_pad", "apple_watch"].includes(device_type)) {
      return res.status(400).json({ error: "Invalid device type" });
    }

    const doc = await screen_shot.findOne();

    if (!doc || !Array.isArray(doc[device_type])) {
      return res.status(404).json({ error: "Screenshots not found" });
    }

    if (index < 0 || index >= doc[device_type].length) {
      return res.status(400).json({ error: "Invalid index" });
    }

    // Remove the image at given index
    doc[device_type].splice(index, 1);
    await doc.save();

    res.status(200).json({
      success: true,
      message: "Screenshot deleted successfully",
      data: doc,
    });
  } catch (err) {
    console.error("❌ Error deleting screenshot:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
