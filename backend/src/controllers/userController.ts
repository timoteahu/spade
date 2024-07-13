import { NextFunction } from "express";

import * as UserType from "../@types/UserTypes";
import prisma from "../utils/prisma";

/* ==== CREATE ====*/
export const createUser = async (
  req: UserType.CreateUserRequest,
  res: UserType.CreateUserResponse,
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
  req: UserType.GetUserRequest,
  res: UserType.GetUserResponse,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    res.status(200).send(user ? user : {});
  } catch (err) {
    next(err);
  }
};

/* ==== DELETE ====*/
export const deleteUser = async (
  req: UserType.DeleteUserRequest,
  res: UserType.DeleteUserResponse,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    res.status(200).send(user);
  } catch (err) {
    next();
  }
};
