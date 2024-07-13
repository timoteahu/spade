import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express-serve-static-core";
import { JwtPayload } from "jsonwebtoken";

import { EmptyObject, UnknownObject } from "./ObjectTypes";

/* Typed Request */
/*  - passes generics of mentioned names into Request   */
/*  - this then passes the types into Express's Request */
/*  - will be of unknown Object unless specified          */
/* useful link: https://greenydev.com/blog/extend-express-types/ */
export type Request<
  Params = UnknownObject,
  ReqBody = UnknownObject,
  Query = UnknownObject,
> = ExpressRequest<Params, UnknownObject, ReqBody, Query>;

/* sends this in body when there is an error */
export type ResError = { message: string };

/* Must Specify Response Body Type or it will be empty*/
/* Strictly Types Json function, must either be of ResBody (Type specified) or ResError */
export type Response<ResBody = EmptyObject> = ExpressResponse & {
  json: (body: ResBody | ResError) => ExpressResponse;
};

/* Authenticated Request */
export type AuthenticatedRequest<
  Params = UnknownObject,
  ReqBody = UnknownObject,
  Query = UnknownObject,
> = Request<Params, ReqBody, Query> & {
  payload?: JwtPayload;
};
