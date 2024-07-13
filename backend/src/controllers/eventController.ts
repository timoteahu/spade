import { NextFunction } from "express";

/* import types */
import {
  CreateEventRequest,
  CreateEventResponse,
  DeleteEventRequest,
  DeleteEventResponse,
  GetEventRequest,
  GetEventResponse,
  UpdateEventRequest,
  UpdateEventResponse,
} from "../types/ApiTypes/EventTypes";
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
  req: CreateEventRequest,
  res: CreateEventResponse,
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

// /* ==== READ ==== */
// export const getEvents = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     /* get groupId from params */
//     const { groupId } = req.params;

//     /* catch errors */
//     if (!groupId) throw createError(400, "eventId argument is missing");

//     /* grabs all events within a group */
//     const event = await prisma.event.findMany({
//       where: {
//         groupId: {
//           equals: parseInt(groupId),
//         },
//       },
//     });

//     /* send to client */
//     res.status(200).send(event);
//   } catch (err) {
//     next(err);
//   }
// };

// grabs event from event Id
export const getEvent = async (
  req: GetEventRequest,
  res: GetEventResponse,
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
  req: UpdateEventRequest,
  res: UpdateEventResponse,
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
  req: DeleteEventRequest,
  res: DeleteEventResponse,
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
