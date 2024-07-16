import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import * as authTypes from "../types/AuthenticationTypes";
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
  req: authTypes.checkMembershipRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    /* load arguments and pass errors */
    const groupIdBody = req.body.groupId;
    const groupIdParam = req.params.groupId as string;
    const userId = req?.payload?.userId;

    const groupId = groupIdBody ? groupIdBody : parseInt(groupIdParam);

    if (!groupId) {
      console.log(req.body);
      throw createError(401, "Parameters do not contain required values");
    }
    if (!userId)
      throw createError(401, "Token does not contain required payload");

    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        members: {
          where: {
            id: parseInt(userId),
          },
        },
      },
    });

    if (!group || group.members.length == 0) {
      throw createError(401, "User is not a part of this group");
    }
    next();
  } catch (error) {
    next(error);
  }
};
