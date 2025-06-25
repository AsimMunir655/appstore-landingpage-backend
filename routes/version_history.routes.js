import express from "express";
import {
  createVersionHistory,
  getVersionHistory,
} from "../controllers/version_history.controller.js";
import { authenticatedUser } from "../middleware/authenticatedUser.js";

const router = express.Router();

router.post("/set-history", authenticatedUser, createVersionHistory);
router.get("/get-history", authenticatedUser, getVersionHistory);

export default router;
