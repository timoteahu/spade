import { Request, Response } from "./ExpressTypes";
import { UnknownObject } from "./ObjectTypes";

export type createEventBody = {
  title: string;
  description: string;
  groupId: number;
};
export type CreateEventRequest = Request<UnknownObject, createEventBody>;
export type CreateEventResponse = Response;
