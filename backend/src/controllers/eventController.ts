import { NextFunction, Response } from "express";

import { createError } from "../middleware/handleErrors";
import * as eventTypes from "../types/api/event/eventExpress";
import prisma from "../utils/prisma";

/* ==== CREATE ====*/
export const createEvent = async (
  req: eventTypes.createEventRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const title = req.body.title;
    const groupId = req.body.groupId;
    const description = req.body.description;

    if (!title || !description || !groupId)
      throw createError(400, "Required argument not provided");

    const event = await prisma.event.create({
      data: {
        title: title,
        description: description,
        groupId: groupId,
      },
    });

    res.status(201).send(event);
  } catch (err) {
    next(err);
  }
};

// grabs event from event Id
export const getEvent = async (
  req: eventTypes.getEventRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const eventId = req.params.eventId;

    if (!eventId) throw createError(400, "Required argument not provided");

    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(eventId),
      },
    });

    res.status(200).send(event ? event : {});
  } catch (err) {
    next(err);
  }
};

/* ==== Update ====*/
export const updateEvent = async (
  req: eventTypes.updateEventRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { eventId } = req.params;
    const { title, description } = req.body;

    if (!eventId) throw createError(400, "Required argument not provided");

    const updatedEvent = await prisma.event.update({
      where: {
        id: parseInt(eventId),
      },
      data: {
        title: title,
        description: description,
      },
    });

    res.status(200).send(updatedEvent);
  } catch (error) {
    next(error);
  }
};

/* ==== DELETE ====*/
export const deleteEvent = async (
  req: eventTypes.deleteEventRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { eventId } = req.params;

    if (!eventId) throw createError(400, "Required argument not provided");

    const event = await prisma.event.delete({
      where: {
        id: parseInt(eventId),
      },
    });

    res.status(200).send(event);
  } catch (error) {
    next(error);
  }
};
