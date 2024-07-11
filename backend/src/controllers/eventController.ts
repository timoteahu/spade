import { Request, Response } from "express";

import prisma from "../utils/prisma";

/* TODO !!*/
// - HANDLE ERRORS

/* Error codes */
// 201 - created
// 400 - bad request
// 403 - forbidden
// 401 - unauthorized
// 405 - method not allowed
// 500 - Internal Server Error

/* event schema */
// id          Int      @id @default(autoincrement())
// title       String
// description String?
// groupId     Int
// group       Group    @relation(fields: [groupId], references: [id])
// createdAt   DateTime @default(now())
// updatedAt   DateTime @updatedAt

/* ==== CREATE ====*/
export const createEvent = async (req: Request, res: Response) => {
  /* parse body*/
  const { title, description, groupId } = req.body;

  /* missing field error */
  if (!title) {
    return res
      .status(400)
      .json({
        error: "Bad Request",
        message: "required fields are missing",
        missingFields: {
          title: !title,
          groupId: !groupId,
        },
      })
      .send();
  }

  /* add to database */
  try {
    // create from prisma schema
    const event = await prisma.event.create({
      data: {
        title: title,
        description: description,
        groupId: parseInt(groupId),
      },
    });

    // send status to api user
    return res.status(201).json({
      message: "Created",
      data: event,
    });
  } catch (e) {
    return res
      .status(500)
      .json({
        error: "Internal Server Error",
        message: e,
      })
      .send();
  }
};

/* ==== READ ==== */
export const getEvents = async (req: Request, res: Response) => {
  // get groupId from params
  const { groupId } = req.params;

  if (!groupId) return res.status(400).send("No groupID"); //MUST FIX THIS.

  try {
    // grabs all events within a group
    const event = await prisma.event.findMany({
      where: {
        groupId: {
          equals: parseInt(groupId),
        },
      },
    });

    res.status(200).send(event);
  } catch (err) {
    res.status(400).send(err);
  }
};

// grabs event from event Id
export const getEvent = async (req: Request, res: Response) => {
  // get groupId from params
  const { eventId } = req.params;

  if (!eventId) return res.status(400).send("No eventId"); //MUST FIX THIS.

  try {
    // grabs all events within a group
    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(eventId),
      },
    });

    res.status(200).send(event);
  } catch (err) {
    res.status(400).send(err);
  }
};

/* ==== Update ====*/

export const changeEventDesc = async (req: Request, res: Response) => {
  // get groupId from params
  const { eventId } = req.params;
  const { newDescription } = req.body;

  if (!eventId) return res.status(400).send("No eventId"); //MUST FIX THIS.

  try {
    // grabs all events within a group
    const updatedEvent = await prisma.event.update({
      where: {
        id: parseInt(eventId),
      },
      data: {
        description: newDescription,
      },
    });

    res.status(200).send(updatedEvent);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const changeEventTitle = async (req: Request, res: Response) => {
  // get groupId from params
  const { eventId } = req.params;
  const { newTitle } = req.body;

  if (!eventId) return res.status(400).send("No eventId"); //MUST FIX THIS.

  try {
    // grabs all events within a group
    const updatedEvent = await prisma.event.update({
      where: {
        id: parseInt(eventId),
      },
      data: {
        title: newTitle,
      },
    });

    res.status(200).send(updatedEvent);
  } catch (err) {
    res.status(400).send(err);
  }
};

/* ==== DELETE ====*/
export const deleteEvent = async (req: Request, res: Response) => {
  // get groupId from params
  const { eventId } = req.params;

  if (!eventId) return res.status(400).send("No eventId"); //MUST FIX THIS.

  try {
    // grabs all events within a group
    const event = await prisma.event.delete({
      where: {
        id: parseInt(eventId),
      },
    });

    res.status(200).send(event);
  } catch (err) {
    res.status(400).send(err);
  }
};
