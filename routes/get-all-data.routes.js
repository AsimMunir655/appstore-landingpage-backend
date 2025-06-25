import express from "express";
import {
  deleteScreenshot,
  get_All_Data_Web,
} from "../controllers/get.all.data.controller.js";
import { authenticatedUser } from "../middleware/authenticatedUser.js";

const getAllDataRouter = express.Router();

getAllDataRouter.get("/all-in-one", get_All_Data_Web);
getAllDataRouter.delete("/delete-image", authenticatedUser, deleteScreenshot);

export default getAllDataRouter;
