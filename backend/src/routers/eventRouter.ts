import express from "express";

import {
  createEvent,
  deleteEvent,
  getEvent,
  updateEvent,
} from "../controllers/eventController";
import { checkMembership } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/:groupId/", checkMembership, createEvent);
router.get("/:groupId/:eventId", checkMembership, getEvent);
router.patch("/:groupId/:eventId", checkMembership, updateEvent);
router.delete("/:groupId/:eventId", checkMembership, deleteEvent);

export default router;
