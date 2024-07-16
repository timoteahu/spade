import { Request } from "express";
import * as core from "express-serve-static-core";
import { JwtPayload } from "jsonwebtoken";

import { UnknownObject } from "./otherTypes";

export type AuthenticatedRequest<
  Params = core.ParamsDictionary,
  ResBody = UnknownObject,
  ReqBody = UnknownObject,
  Query = UnknownObject,
> = Request<Params, ResBody, ReqBody, Query> & {
  payload?: JwtPayload;
};

export type checkMembershipBody = {
  groupId?: number;
};
export type checkMembershipRequest = AuthenticatedRequest<
  core.ParamsDictionary,
  UnknownObject,
  checkMembershipBody
>;
