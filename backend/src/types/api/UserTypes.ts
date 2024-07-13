import { Request, Response } from "../other/ExpressTypes";
import { UnknownObject } from "../other/ObjectTypes";

/* Create User*/
type CreateUserBody = {
  username: string;
  email: string;
};
export type CreateUserRequest = Request<UnknownObject, CreateUserBody>;
export type CreateUserResponse = Response;

/* Get User*/
export type GetUserParams = {
  userId: number;
};
export type GetUserRequest = Request<GetUserParams, UnknownObject>;
export type GetUserResponse = Response;

export type DeleteUserParams = {
  userId: number;
};
export type DeleteUserRequest = Request<DeleteUserParams, UnknownObject>;
export type DeleteUserResponse = Response;
