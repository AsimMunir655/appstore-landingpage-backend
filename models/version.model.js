import mongoose from "mongoose";

const versionSchema = new mongoose.Schema(
  {
    version: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timesstamps: true }
);

const version_History = mongoose.model("version_History", versionSchema);

export default version_History;
