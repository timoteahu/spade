import { NextFunction } from "express";

import {
  CreateGroupRequest,
  CreateGroupResponse,
  GetGroupRequest,
  GetGroupResponse,
} from "../types/Api Types/GroupTypes";
import prisma from "../utils/prisma";

function generateRandomString(): string {
  const characters = "ABCDEFGHIJLMNOPQRSTUVWXYZ0123456789";
  const length = characters.length;
  let result = "";
  for (let i = 0; i < 9; i++) {
    const randomIdx = Math.floor(Math.random() * length);
    result += characters.charAt(randomIdx);
  }
  return result;
}

//Create Groups
export const createGroup = async (
  req: CreateGroupRequest,
  res: CreateGroupResponse,
  next: NextFunction,
) => {
  try {
    const { name, userid } = req.body;
    const join_code = generateRandomString(); //makes a random 9 digit join code

    const group = await prisma.group.create({
      data: {
        name: name,
        join_code: join_code,
        members: {
          connect: { id: userid }, //adds current user into the group by default
        },
      },
    });

    return res.status(201).send(group);
  } catch (error) {
    next(error);
  }
};

//retrieves group by id
export const getGroups = async (
  req: GetGroupRequest,
  res: GetGroupResponse,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;

    const groups = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: { groups: true },
    });

    res.status(200).send(groups);
  } catch (error) {
    next(error);
  }
};

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

// export const joinGroup = async (
//   req: Request<JoinGroupParam>,
//   res: Response<JoinGroupRes>,
// ) => {
//   const { user_id, join_code } = req.params;
//   if (!join_code) {
//     throw createError(400, "required argument is missing");
//   }
//   try {
//     const updatedGroup = await prisma.group.update({
//       where: { join_code: join_code }, //searches by join code
//       data: {
//         members: {
//           connect: { id: Number(user_id) }, //adds user with the given user_id
//         },
//       },
//     });

//     res.send(updatedGroup);
//   } catch (error) {
//     throw createError(
//       500,
//       error instanceof Error ? error.message : "Unknown error",
//     );
//   }
// };

// type LeaveGroupParam = {
//   user_id: string;
//   group_id: string;
// };

// type LeaveGroupRes = JoinGroupRes;

// export const leaveGroup = async (
//   req: Request<LeaveGroupParam>,
//   res: Response<LeaveGroupRes>,
// ) => {
//   const { user_id, group_id } = req.params;
//   if (!group_id) {
//     throw createError(400, "required argument is missing");
//   }
//   try {
//     const updatedGroup = await prisma.group.update({
//       where: { id: Number(group_id) }, //finds by group id
//       data: {
//         members: {
//           disconnect: { id: Number(user_id) }, //use disconnect to remove user_id from this group
//         },
//       },
//     });
//     res.status(200).send(updatedGroup);
//   } catch (error) {
//     throw createError(
//       500,
//       error instanceof Error ? error.message : "Unknown error",
//     );
//   }
// };

// type ChangeGroupParam = {
//   group_id: string;
//   newName: string;
// };

// type ChangeGroupRes = JoinGroupRes;

// export const changeGroupName = async (
//   req: Request<ChangeGroupParam>,
//   res: Response<ChangeGroupRes>,
// ) => {
//   const { group_id, newName } = req.params;
//   if (!group_id) {
//     throw createError(400, "required argument is missing");
//   }
//   try {
//     const updatedGroup = await prisma.group.update({
//       where: { id: Number(group_id) }, //searches by group_id
//       data: {
//         name: newName, //changes name to newName
//       },
//     });
//     res.status(200).send(updatedGroup);
//   } catch (error) {
//     throw createError(
//       500,
//       error instanceof Error ? error.message : "Unknown error",
//     );
//   }
// };
