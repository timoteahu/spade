import { Request, Response, NextFunction } from "express";

export class APIError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {};
