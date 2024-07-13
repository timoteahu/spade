import { Request, Response } from "../ExpressTypes";
import { UnknownObject } from "../ObjectTypes";

/* Create Event*/
export type CreateEventBody = {
  title: string;
  description: string;
  groupId: number;
};
export type CreateEventRequest = Request<UnknownObject, CreateEventBody>;
export type CreateEventResponse = Response;

/* Get Event */
export type GetEventParams = {
  eventId: number;
};
export type GetEventRequest = Request<GetEventParams, UnknownObject>;
export type GetEventResponse = Response;

/* Update Event */
export type UpdateEventParams = {
  eventId: number;
};
export type UpdateEventBody = {
  title: string;
  description: string;
};
export type UpdateEventRequest = Request<UpdateEventParams, UpdateEventBody>;
export type UpdateEventResponse = Response;

/* Delete Event */
export type DeleteEventParams = {
  eventId: number;
};
export type DeleteEventRequest = Request<DeleteEventParams, UnknownObject>;
export type DeleteEventResponse = Response;
