import * as core from "express-serve-static-core";

import { AuthenticatedRequest } from "../../AuthenticationTypes";
import * as argTypes from "./eventArgs";

export type createEventRequest = AuthenticatedRequest<
  core.ParamsDictionary,
  unknown,
  argTypes.createEventBody
>;

export type updateEventRequest = AuthenticatedRequest<
  core.ParamsDictionary,
  unknown,
  argTypes.updateEventBody
>;

export type getEventRequest = AuthenticatedRequest<argTypes.getEventParams>;
export type deleteEventRequest =
  AuthenticatedRequest<argTypes.deleteEventParams>;
