import * as core from "express-serve-static-core";

import { AuthenticatedRequest } from "../../AuthenticationTypes";
import * as argTypes from "./groupArgs";

export type createGroupRequest = AuthenticatedRequest<
  core.ParamsDictionary,
  unknown,
  argTypes.createGroupBody
>;
