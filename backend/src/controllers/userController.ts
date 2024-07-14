import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { createError } from "../middleware/handleErrors";
import prisma from "../utils/prisma";

/* ==== CREATE ====*/
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Extract email, username, and password from the request body
    const { email, username, password } = req.body;
    if (!email || !username || !password)
      throw createError(400, "Email, username, and password are required");

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) throw createError(400, "User already exists");

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
      },
    });

    console.log(newUser);
    // Create a payload and generate a JWT token
    const payload = {
      userId: newUser.id,
    };

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw createError(501, "JWT key not set");
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

    // Send the token as the response
    res.status(201).json({ token });
  } catch (error) {
    next(error);
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

/* ==== UPDATE ==== */

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
