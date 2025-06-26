import express from "express";
import {
  crateEventsToggle,
  createEvents,
  getEvents,
  getEventsToggle,
} from "../controllers/events.controller.js";
import { authenticatedUser } from "../middleware/authenticatedUser.js";
import uploadMultiple from "../middleware/multerMultiple.js";

const eventsRouter = express.Router();

eventsRouter.post(
  "/set-events",
  authenticatedUser,
  uploadMultiple,
  createEvents
);

eventsRouter.get("/get-events", authenticatedUser, getEvents);

eventsRouter.post("/set-toggle-status", authenticatedUser, crateEventsToggle);

eventsRouter.get("/get-toggle-status", authenticatedUser, getEventsToggle);

export default eventsRouter;
