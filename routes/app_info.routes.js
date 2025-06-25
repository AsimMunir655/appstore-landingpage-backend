import express from "express";
import {
  get_app_info,
  set_app_info,
} from "../controllers/app_info.controller.js";
import upload from "../middleware/multer.js";
import { authenticatedUser } from "../middleware/authenticatedUser.js";

const appRouter = express.Router();

appRouter.post(
  "/app-info",
  authenticatedUser,
  upload.single("image"),
  set_app_info
);

appRouter.get("/app-info", authenticatedUser, get_app_info);

export default appRouter;
