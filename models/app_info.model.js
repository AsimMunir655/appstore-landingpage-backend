import mongoose from "mongoose";

const AppInfoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "App title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title can't exceed 100 characters"],
    },
    image: {
      type: String,
      trim: true,
      default: "", // if you want a fallback
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description can't exceed 1000 characters"],
    },
    company: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const app_info = mongoose.model("app_info", AppInfoSchema);

export default app_info;
