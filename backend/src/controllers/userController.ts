import { NextFunction, Request, Response } from "express";

import prisma from "../utils/prisma";

/* ==== CREATE ====*/
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, email } = req.body;
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
      },
    });

    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
};

/* ==== READ ==== */
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    res.status(200).send(user ? user : {});
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
    const { userId } = req.params;

    const user = await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });

    res.status(200).send(user);
  } catch (err) {
    next();
  }
};
