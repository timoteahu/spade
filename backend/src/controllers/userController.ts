import { NextFunction, Request, Response } from "express";

import { createError } from "../middleware/handleErrors";
import prisma from "../utils/prisma";

/* Schema */
// model User {
//   id        Int      @id @default(autoincrement())
//   username  String   @unique
//   email     String   @unique
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   groups    Group[]  @relation("GroupMembers")
//   User_A    User[]   @relation("UserFriends")
//   User_B    User[]   @relation("UserFriends")
// }

/* ==== CREATE ====*/
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /* parse body*/
    const { username, email } = req.body;

    /* catch errors */
    if (!username || !email)
      throw createError(400, "required argument is missing");

    // create from prisma schema
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
      },
    });

    /* send status to client */
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
};

/* ==== READ ==== */
// grabs User from UserId
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /* get userId from params */
    const { userId } = req.params;

    /* catch errors */
    if (!userId) throw createError(400, "userId argument is missing");

    /* grabs event from it's ID */
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    /* send to client */
    res.status(200).send(user ? user : {});
  } catch (err) {
    next(err);
  }
};

/* ==== Update ====*/
export const addToGroup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /* get groupId from params */
    const { userId } = req.params;
    const { groupId } = req.body;

    /* catches errors */
    if (!groupId || !userId)
      throw createError(400, "required argument is missing");

    /* updates user from event schema */
    const user = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        groups: {
          connect: [{ id: groupId }],
        },
      },
    });

    /* sends user to client */
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

/* ==== DELETE ====*/
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /* get userId from params */
    const { userId } = req.params;

    /* catch errors */
    if (!userId) throw createError(400, "userId argument is missing");

    /* grabs and deletes an event from it's id */
    const user = await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });

    /* sends deleted user to client */
    res.status(200).send(user);
  } catch (err) {
    next();
  }
};
