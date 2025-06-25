import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [50, "Username must be at most 50 characters long"],
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title must be at most 100 characters long"],
    },

    comment: {
      type: String,
      required: [true, "Comment is required"],
      trim: true,
      maxlength: [1000, "Comment must be at most 1000 characters long"],
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],
    },
  },

  {
    timestamps: true,
  }
);
const reviews = mongoose.model("reviews", reviewSchema);

export default reviews;
