import express from "express";

import { authenticatedUser } from "../middleware/authenticatedUser.js";
import {
  getAppDescription,
  updateAppDescription,
} from "../controllers/app_desctription.controller.js";

const app_descriptionRouter = express.Router();

app_descriptionRouter.post(
  "/set-app-desc",
  authenticatedUser,
  updateAppDescription
);

app_descriptionRouter.get(
  "/get-app-desc",
  authenticatedUser,
  getAppDescription
);

export default app_descriptionRouter;
