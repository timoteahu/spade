import { AuthenticatedRequest, Request, Response } from "../ExpressTypes";
import { UnknownObject } from "../ObjectTypes";

/* Create Event*/
export type CreateGroupBody = {
  name: string;
  userid: number;
};
export type CreateGroupRequest = AuthenticatedRequest<
  UnknownObject,
  CreateGroupBody
>;
export type CreateGroupResponse = Response;

export type GetGroupParam = {
  userId: number;
};
export type GetGroupRequest = Request<GetGroupParam>;
export type GetGroupResponse = Response;
// export type GetGroupsRes = {
//   groups:
//     | ({
//         groups: {
//           id: number;
//           name: string;
//           createdAt: Date;
//           updatedAt: Date;
//           join_code: string | null;
//         }[];
//       } & {
//         id: number;
//         username: string;
//         email: string;
//         createdAt: Date;
//         updatedAt: Date;
//       })
//     | null;
// };

//Update or change group name or add/delete users
// type JoinGroupParam = {
//   user_id: string;
//   join_code: string;
// };

// type JoinGroupRes = {
//   id: number;
//   name: string;
//   createdAt: Date;
//   updatedAt: Date;
//   join_code: string | null;
// };
