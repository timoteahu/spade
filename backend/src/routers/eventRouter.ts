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

router.post("/", createEvent);
router.get("/:groupId", getEvents);
router.get("/event/:eventId", getEvent);
router.patch("/description/:eventId", changeEventDesc);
router.patch("/title/:eventId", changeEventTitle);
router.delete("/:eventId", deleteEvent);

export default router;
