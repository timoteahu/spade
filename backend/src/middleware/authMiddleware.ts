import { NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import {
  AuthenticatedRequest,
  Request,
  Response,
} from "./../types/ExpressTypes";
import { createError } from "./handleErrors";

export const authenticateToken = (
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
