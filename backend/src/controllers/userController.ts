import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { createError } from "../middleware/handleErrors";
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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /* grabs email... pass from body */
    const { email } = req.body;
    if (!email) throw createError(400, "No email provided");

    /* finds user from email */
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) throw createError(400, "No user found");

    /* authentication payload */
    const payload = {
      userId: user.id,
    };

    /* checks for undefined secret key*/
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw createError(501, "jwt key not set");
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

    res.status(200).send(token);
  } catch (error) {
    next(error);
  }
};

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
