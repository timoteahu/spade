import express from "express";

import {
  changeEventDesc,
  changeEventTitle,
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
} from "../controllers/eventController";

const router = express.Router();

router.post("/create", createEvent);
router.get("/:groupId/get-group-events", getEvents);
router.get("/:eventId/get-event", getEvent);
router.post("/:eventId/description", changeEventDesc);
router.post("/:eventId/title", changeEventTitle);
router.get("/:eventId/delete", deleteEvent);

export default router;
