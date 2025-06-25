// models/appDescription.model.js
import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  heading: String,
  points: [String],
});

const appDescriptionSchema = new mongoose.Schema({
  title: String,
  sections: [sectionSchema],
});

const App_Description = mongoose.model("App_Description", appDescriptionSchema);
export default App_Description;
