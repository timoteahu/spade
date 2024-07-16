import * as core from "express-serve-static-core";

import { AuthenticatedRequest } from "../../AuthenticationTypes";
import * as argTypes from "./eventArgs";

export type createEventRequest = AuthenticatedRequest<
  core.ParamsDictionary,
  unknown,
  argTypes.createEventBody
>;
