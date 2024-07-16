import bcrypt from "bcrypt";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import { createError } from "../middleware/handleErrors";
import * as userTypes from "../types/api/user/userExpress";
import prisma from "../utils/prisma";

/* ==== CREATE ====*/
export const signUp = async (
  req: userTypes.createUserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Extract email, username, and password from the request body
    const { email, username, password } = req.body;

    /* validate body */
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

    // Create a payload and generate a JWT token
    const payload = {
      userId: newUser.id,
    };
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw createError(501, "JWT key not set");

    const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

    // Send the token as the response

    res.status(201).set("Authorization", `Bearer ${token}`).send({ token });
  } catch (error) {
    next(error);
  }
};

/* ==== READ ==== */
export const login = async (
  req: userTypes.loginRequeset,
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

    res.status(200).set("Authorization", `Bearer ${token}`).send();
  } catch (error) {
    next(error);
  }
};

// export const getUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const { userId } = req.params;

//     const user = await prisma.user.findUnique({
//       where: {
//         id: parseInt(userId),
//       },
//     });

//     res.status(200).send(user ? user : {});
//   } catch (error) {
//     next(error);
//   }
// };

/* ==== UPDATE ==== */
export const joinGroup = async (
  req: userTypes.joinGroupRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req?.payload?.userId;
    const groupId = req.body.groupId;

    /* error handling */
    if (!userId || !groupId)
      throw createError(400, "Required argument not provided");

    const updatedGroup = await prisma.group.update({
      where: { id: groupId },
      data: {
        members: {
          connect: { id: parseInt(userId) }, //adds user with the given user_id
        },
      },
    });
    const returnBody = {
      groupId: updatedGroup.id,
    };

    res.status(200).json(returnBody).send();
  } catch (error) {
    next(error);
  }
};

export const leaveGroup = async (
  req: userTypes.leaveGroupRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req?.payload?.userId;
    const groupId = req.body.groupId;

    /* error handling */
    if (!userId || !groupId)
      throw createError(400, "Required argument not provided");

    const updatedGroup = await prisma.group.update({
      where: { id: groupId },
      data: {
        members: {
          disconnect: { id: parseInt(userId) },
        },
      },
    });

    const returnBody = {
      groupId: updatedGroup.id,
    };

    res.status(200).json(returnBody).send();
  } catch (error) {
    next(error);
  }
};

/* ==== DELETE ====*/
export const deleteUser = async (
  req: userTypes.deleteUserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.payload?.userId;

    const user = await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });

    const returnBody = {
      userId: user.id,
      email: user.email,
    };
    res.status(200).json(returnBody).send();
  } catch (err) {
    next();
  }
};
