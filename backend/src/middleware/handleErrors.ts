import { NextFunction, Request, Response } from "express";

interface responseError extends Error {
  status?: number;
}

export const createError = (status: number, message: string) => {
  const err: responseError = new Error(message);
  err.status = status;
  return err;
};

export const handleErrors = (
  err: responseError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.status || 500).json({
    message: err,
  });
  next();
};
