import { NextFunction, Request, Response } from "express";

import { createError } from "../middleware/handleErrors";
import prisma from "../utils/prisma";

/* == status codes == */
// 200         OK
// 201         Created
// 202         Accepted
// 204         No Content
// 206         Partial Content

// 400         Bad Request
// 401         Unauthorized
// 404         Not Found

/* event schema */
// id          Int      @id @default(autoincrement())
// title       String
// description String?
// groupId     Int
// group       Group    @relation(fields: [groupId], references: [id])
// createdAt   DateTime @default(now())
// updatedAt   DateTime @updatedAt

/* ==== CREATE ====*/
export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /* parse body*/
    const { title, description, groupId } = req.body;

    /* catch errors */
    if (!title || !description)
      throw createError(400, "required argument is missing");

    // create from prisma schema
    const event = await prisma.event.create({
      data: {
        title: title,
        description: description,
        groupId: parseInt(groupId),
      },
    });

    /* send status to client */
    res.status(201).send(event);
  } catch (err) {
    next(err);
  }
};

/* ==== READ ==== */
export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /* get groupId from params */
    const { groupId } = req.params;

    /* catch errors */
    if (!groupId) throw createError(400, "eventId argument is missing");

    /* grabs all events within a group */
    const event = await prisma.event.findMany({
      where: {
        groupId: {
          equals: parseInt(groupId),
        },
      },
    });

    /* send to client */
    res.status(200).send(event);
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
    /* get groupId from params */
    const { eventId } = req.params;

    /* catch errors */
    if (!eventId) throw createError(400, "eventId argument is missing");

    /* grabs event from it's ID */
    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(eventId),
      },
    });

    /* send to client */
    res.status(200).send(event);
  } catch (err) {
    next(err);
  }
};

/* ==== Update ====*/
export const changeEventDesc = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  /* get groupId from params */
  const { eventId } = req.params;
  const { newDescription } = req.body;

  /* catches errors */
  if (!eventId || !newDescription)
    throw createError(400, "eventId argument is missing");

  try {
    /* updates event from event schema */
    const updatedEvent = await prisma.event.update({
      where: {
        id: parseInt(eventId),
      },
      data: {
        description: newDescription,
      },
    });

    /* sends new event to client */
    res.status(200).send(updatedEvent);
  } catch (err) {
    next(err);
  }
};

export const changeEventTitle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // get groupId from params
    const { eventId } = req.params;
    const { newTitle } = req.body;

    /* catch errors */
    if (!eventId) throw createError(400, "eventId argument is missing");

    // grabs all events within a group
    const updatedEvent = await prisma.event.update({
      where: {
        id: parseInt(eventId),
      },
      data: {
        title: newTitle,
      },
    });

    /* sends new event to client */
    res.status(200).send(updatedEvent);
  } catch (err) {
    next(err);
  }
};

/* ==== DELETE ====*/
export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /* get groupId from params */
    const { eventId } = req.params;

    /* catch errors */
    if (!eventId) throw createError(400, "eventId argument is missing");

    /* grabs and deletes an event from it's id */
    const event = await prisma.event.delete({
      where: {
        id: parseInt(eventId),
      },
    });

    /* sends deleted event to client */
    res.status(200).send(event);
  } catch (err) {
    next();
  }
};
