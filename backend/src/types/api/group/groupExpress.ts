import * as core from "express-serve-static-core";

import { AuthenticatedRequest } from "../../AuthenticationTypes";
import * as argTypes from "./groupArgs";

export type createGroupRequest = AuthenticatedRequest<
  core.ParamsDictionary,
  unknown,
  argTypes.createGroupBody
>;

export type getUserGroupsRequest = AuthenticatedRequest<
  argTypes.getUserGroupsParams,
  unknown
>;

export type getGroupByIdRequest = AuthenticatedRequest<
  argTypes.getGroupByIdParams,
  unknown
>;
