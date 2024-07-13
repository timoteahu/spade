import express from "express";

import {
  createEvent,
  deleteEvent,
  getEvent,
  updateEvent,
} from "../controllers/eventController";

const router = express.Router();

router.post("/", createEvent);
router.get("/:eventId", getEvent);
router.patch("/:eventId", updateEvent);
router.delete("/:eventId", deleteEvent);

export default router;
