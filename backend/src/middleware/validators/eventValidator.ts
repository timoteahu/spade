import { NextFunction, Response } from "express";
import * as core from "express-serve-static-core";
import { body, validationResult } from "express-validator";

import * as bodyTypes from "../../types/apiBody";
import { AuthenticatedRequest } from "../../types/AuthenticationTypes";

export const validateCreateEvent = (
  req: AuthenticatedRequest<
    core.ParamsDictionary,
    unknown,
    bodyTypes.checkMembershipBody
  >,
  res: Response,
  next: NextFunction,
) => {
  body("title").isLength({ max: 15 });
  body("description").isLength({ max: 150 });
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    req.body = req.body as unknown as bodyTypes.createEventBody;

    next();
  } catch (error) {
    next(error);
  }
};
