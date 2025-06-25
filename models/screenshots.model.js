import mongoose from "mongoose";

const screenShotsSchema = mongoose.Schema(
  {
    i_phone: {
      type: [String],
      default: [],
    },
    i_pad: {
      type: [String],
      default: [],
    },
    apple_watch: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const screen_shot = mongoose.model("screen_shot", screenShotsSchema);
export default screen_shot;
