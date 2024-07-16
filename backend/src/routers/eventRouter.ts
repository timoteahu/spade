import express from "express";

import {
  createEvent,
  deleteEvent,
  getEvent,
  updateEvent,
} from "../controllers/eventController";
import { checkMembership } from "../middleware/authMiddleware";
import { validateCreateEvent } from "../middleware/validators/eventValidator";

const router = express.Router();

router.post("/:groupId/", checkMembership, validateCreateEvent, createEvent);
router.get("/:groupId/:eventId", checkMembership, getEvent);
router.patch("/:groupId/:eventId", checkMembership, updateEvent);
router.delete("/:groupId/:eventId", checkMembership, deleteEvent);

export default router;
