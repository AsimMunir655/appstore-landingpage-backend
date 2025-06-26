import Events_Group from "../models/events.model.js";
import events_toggle from "../models/events.toggle.model.js";

export const createEvents = async (req, res) => {
  try {
    const { titles } = req.body; // titles should be an array
    const eventImages = req.files?.events_image || [];

    // Ensure 1 to 3 titles
    if (!titles || titles.length === 0 || titles.length > 3) {
      return res.status(400).json({ message: "Please provide 1 to 3 titles." });
    }

    // Ensure 1 to 3 images
    if (eventImages.length === 0 || eventImages.length > 3) {
      return res
        .status(400)
        .json({ message: "Please upload 1 to 3 event images." });
    }

    // If titles is a single string (not array), convert it
    const titleArray = Array.isArray(titles) ? titles : [titles];

    // Match title and image count
    const events = titleArray.map((title, index) => ({
      title,
      image: eventImages[index]?.path || "",
    }));

    // Create or update (overwrite if exists)
    let existingGroup = await Events_Group.findOne();

    if (existingGroup) {
      existingGroup.events = events;
      await existingGroup.save();
      return res
        .status(200)
        .json({ message: "Events updated successfully", data: existingGroup });
    }

    const newGroup = new Events_Group({ events });
    await newGroup.save();

    res
      .status(201)
      .json({ message: "Events created successfully", data: newGroup });
  } catch (error) {
    console.error("Error in createEvents:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const getEvents = async (req, res) => {
//   try {
//     const eventsData = await Events_Group.find();

//     if (!eventsData || eventsData.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No events found.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Events retrieved successfully.",
//       data: eventsData,
//     });
//   } catch (error) {
//     console.error("Error retrieving events:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong. Please try again later.",
//     });
//   }
// };

export const getEvents = async (req, res) => {
  try {
    const eventsData = await Events_Group.find({}, { events: 1, _id: 0 }); // only return `events` field

    if (!eventsData || eventsData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No events found.",
        data: [],
      });
    }

    // If you want only the latest document's events (assuming you store 1 document)
    const eventsOnly = eventsData[0].events;

    return res.status(200).json({
      success: true,
      message: "Events retrieved successfully.",
      data: eventsOnly,
    });
  } catch (error) {
    console.error("Error retrieving events:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

export const crateEventsToggle = async (req, res) => {
  const { status } = req.body;

  try {
    let statusDoc = await events_toggle.findOne();

    if (!statusDoc) {
      // Create new document if none exists
      statusDoc = new events_toggle({ isActive: status });
      await statusDoc.save();
    } else {
      statusDoc.isActive = status;
      await statusDoc.save();
    }

    res.status(200).json({
      success: true,
      data: statusDoc,
      message: `Toggle Status ${
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

export const getEventsToggle = async (req, res) => {
  try {
    // Find the status document (assuming single document)
    const statusDoc = await events_toggle.findOne();

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
