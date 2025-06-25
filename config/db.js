import mongoose from "mongoose";
import "colors";
import dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Mongo DB connected successfully".bold.blue.underline);
  } catch (err) {
    console.error(err || "Failed to connect with DB");
    process.exit(1);
  }
};

export default connectDB;
