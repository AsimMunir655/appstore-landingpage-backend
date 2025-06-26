import mongoose from "mongoose";

const toggle = mongoose.Schema(
  {
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const events_toggle = mongoose.model("events_toggle", toggle);

export default events_toggle;
