import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type AuthenticatedRequest = Request & {
  payload: JwtPayload;
};
