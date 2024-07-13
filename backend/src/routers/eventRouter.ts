import express from "express";

import {
  createEvent,
  deleteEvent,
  getEvent,
} from "../controllers/eventController";

const router = express.Router();

router.post("/", createEvent);
//router.get("/:groupId", getEvents);
router.get("/event/:eventId", getEvent);
//router.patch("/description/:eventId", changeEventDesc);
//router.patch("/title/:eventId", changeEventTitle);
router.delete("/:eventId", deleteEvent);

export default router;
