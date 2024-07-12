import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export {};

declare global {
  namespace Express {
    interface Request {
      payload?: JwtPayload;
    }
  }
}
