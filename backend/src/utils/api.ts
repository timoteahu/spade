import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";

import { EmptyObject, UnknownObject } from "./types";

export type Request<
  RequestParams = UnknownObject,
  RequestBody = UnknownObject,
  RequestQuery = UnknownObject,
> = ExpressRequest<RequestParams, UnknownObject, RequestBody, RequestQuery>;

export type ResError = { error: string };

export type Response<ResBody = EmptyObject> = ExpressResponse & {
  json: (body: ResBody | ResError) => ExpressResponse;
};
