import express from "express";

import {
  createEvent,
  deleteEvent,
  getEvent,
  updateEvent,
} from "../controllers/eventController";
import { checkMembership } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", checkMembership, createEvent);
router.get("/:eventId", getEvent);
router.patch("/:eventId", updateEvent);
router.delete("/:eventId", deleteEvent);

export default router;
