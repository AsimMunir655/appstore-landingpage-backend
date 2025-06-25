import reviews from "../models/review.model.js";

// Create new review (user submission)
export const createReview = async (req, res) => {
  try {
    const { username, title, comment, rating } = req.body;

    const review = new reviews({
      username,
      title,
      comment,
      rating,
    });

    await review.save();

    res.status(201).json({
      success: true,
      message: "Review submitted successfully.",
      review,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating review", error: error.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const findReviews = await reviews.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All reviews found successfully",
      findReviews,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const countReviewsAndAverage = async (req, res) => {
  try {
    // Get all reviews (optional for listing)
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

    // Send response
    res.status(200).json({
      success: true,
      message: "All reviews found successfully",
      totalCount,
      averageRating: Number(averageRating.toFixed(1)),
      ratingDistribution,
      reviews: findReviews,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
