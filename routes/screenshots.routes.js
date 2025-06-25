import express from "express";
import {
  getAllScreenshots,
  uploadScreenshots,
} from "../controllers/screenShots.controller.js";
import { authenticatedUser } from "../middleware/authenticatedUser.js";
import uploadMultiple from "../middleware/multerMultiple.js";

const screenShotsRouter = express.Router();

screenShotsRouter.post(
  "/screenshots",
  authenticatedUser,
  uploadMultiple,
  uploadScreenshots
);

screenShotsRouter.get("/screenshots", authenticatedUser, getAllScreenshots);

export default screenShotsRouter;
