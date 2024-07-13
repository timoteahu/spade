import { NextFunction } from "express";

/* import types */
import * as EventType from "../@types/EventTypes";
import prisma from "../utils/prisma";

/* ==== CREATE ====*/
export const createEvent = async (
  req: EventType.CreateEventRequest,
  res: EventType.CreateEventResponse,
  next: NextFunction,
) => {
  try {
    const { title, description, groupId } = req.body;

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
  req: EventType.GetEventRequest,
  res: EventType.GetEventResponse,
  next: NextFunction,
) => {
  try {
    const { eventId } = req.params;

    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    res.status(200).send(event ? event : {});
  } catch (err) {
    next(err);
  }
};

/* ==== Update ====*/
export const updateEvent = async (
  req: EventType.UpdateEventRequest,
  res: EventType.UpdateEventResponse,
  next: NextFunction,
) => {
  try {
    const { eventId } = req.params;
    const { title, description } = req.body;

    const updatedEvent = await prisma.event.update({
      where: {
        id: eventId,
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
  req: EventType.DeleteEventRequest,
  res: EventType.DeleteEventResponse,
  next: NextFunction,
) => {
  try {
    const { eventId } = req.params;

    const event = await prisma.event.delete({
      where: {
        id: eventId,
      },
    });

    res.status(200).send(event);
  } catch (error) {
    next(error);
  }
};
