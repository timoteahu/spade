/* eslint-disable @typescript-eslint/no-unused-vars */
// -> error parameter required but shows error in eslint

import { NextFunction, Request, Response } from "express";

interface ResponseError extends Error {
  status?: number;
}

export const createError = (status: number, message: string): ResponseError => {
  const err: ResponseError = new Error(message);
  err.status = status;
  return err;
};

export const handleErrors = (
  err: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
};
