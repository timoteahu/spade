import { NextFunction, Response } from "express";
import { body, validationResult } from "express-validator";

import * as bodyTypes from "../../types/api/event/eventArgs";
import * as authTypes from "../../types/AuthenticationTypes";

export const validateCreateEvent = (
  req: authTypes.checkMembershipRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    body("title").isLength({ max: 15 });
    body("description").isLength({ max: 150 });

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
