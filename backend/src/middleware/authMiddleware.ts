import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { AuthenticatedRequest } from "../types/AuthenticationTypes";
import prisma from "../utils/prisma";
import { createError } from "./handleErrors";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    /* split grab the token from the authorization header */
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    /* throw error if token is not provided */
    if (!token) throw createError(401, "token not provided");

    /* checks for undefined secret key*/
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw createError(501, "jwt key not set");

    /* verify */
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    (req as AuthenticatedRequest).payload = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

export const checkMembership = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    /* load arguments and pass errors */
    const payload = req.payload;
    const groupId = req.params.groupId;
    if (!groupId) throw createError(401, "GroupId not provided");
    console.log(payload);
    if (!payload) throw createError(401, "Payload not provided");

    const { userId } = payload;
    if (!userId) throw createError(401, "Token does not contain user");

    const user = await prisma.group.findUnique({
      where: {
        id: parseInt(groupId),
      },
      include: {
        members: {
          where: {
            id: parseInt(userId),
          },
        },
      },
    });

    if (!user || user.members.length == 0)
      throw createError(401, "User is not a part of this group");

    next();
  } catch (error) {
    next(error);
  }
};
