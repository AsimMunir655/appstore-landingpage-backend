import mongoose from "mongoose";

// Define schema with validation and default settings
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      default: "",
    },
    lastName: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // by default password DB se query me nahi aata
    },
  },
  {
    timestamps: true, // ✅ Correct key is `timestamps` (not `timeStamp`)
  }
);

// Create model
const User = mongoose.model("User", userSchema);

export default User;
