import * as core from "express-serve-static-core";

import { AuthenticatedRequest } from "../../AuthenticationTypes";
import { CustomRequest } from "../../customExpress";
import * as argTypes from "./userArgs";

export type createUserRequest = CustomRequest<
  core.ParamsDictionary,
  unknown,
  argTypes.createUserBody
>;

export type loginRequeset = CustomRequest<
  core.ParamsDictionary,
  unknown,
  argTypes.loginBody
>;

export type joinGroupRequest = AuthenticatedRequest<
  core.ParamsDictionary,
  unknown,
  argTypes.joinGroupBody
>;

export type leaveGroupRequest = AuthenticatedRequest<
  core.ParamsDictionary,
  unknown,
  argTypes.leaveGroupBody
>;

export type deleteUserRequest = AuthenticatedRequest;
