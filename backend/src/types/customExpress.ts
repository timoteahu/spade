import { Request } from "express";
import * as core from "express-serve-static-core";
import { JwtPayload } from "jsonwebtoken";

type unknownObject = Record<string, unknown>;

export type CustomRequest<
  Params = core.ParamsDictionary,
  ResBody = unknownObject,
  ReqBody = unknownObject,
  Query = unknown,
> = Request<Params, ResBody, ReqBody, Query> & {
  payload?: JwtPayload;
};
