import express from "express";

import {
  changeToggleStatus,
  getToggleStatus,
} from "../controllers/toggle_status.controller.js";
import { authenticatedUser } from "../middleware/authenticatedUser.js";
const toggleRoutes = express.Router();

toggleRoutes.post("/status", authenticatedUser, changeToggleStatus);

toggleRoutes.get("/get-status", authenticatedUser, getToggleStatus);

export default toggleRoutes;
