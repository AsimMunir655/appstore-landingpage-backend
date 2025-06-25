import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "colors";
import connectDB from "./config/db.js";
import connectRoutes from "./routes/connectRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 2000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
connectRoutes(app);

app.get("/", (req, res) => {
  res.send("Hello Hafiz Muhammad Umer");
});

app.listen(PORT, () => {
  console.log(
    `Server is running successfully on port ${PORT}`.magenta.bold.underline
  );
  console.log(`http://localhost:${PORT}`.yellow.bold.underline);
});

connectDB();

export default app;
