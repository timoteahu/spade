import { NextFunction, Request, Response } from "express";

import { createError } from "../middleware/handleErrors";
import { AuthenticatedRequest } from "../types/AuthenticationTypes";
import prisma from "../utils/prisma";

/* ==== CREATE ====*/
export const createEvent = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, groupId } = req.body;

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
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { eventId } = req.params;

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
  req: Request,
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
  req: Request,
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
