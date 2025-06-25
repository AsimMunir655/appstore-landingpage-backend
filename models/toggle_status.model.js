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

const toggle_status_head = mongoose.model("toggle_status_head", toggle);

export default toggle_status_head;
