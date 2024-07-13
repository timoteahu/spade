import { Request, Response } from "express";

import { createError } from "../middleware/handleErrors";
import { EmptyObject } from "../types/ObjectTypes";
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

type CreateGroupBody = {
  name: string;
  user_id: number;
};

export const createGroup = async (
  req: Request<EmptyObject, CreateGroupBody>,
  res: Response,
) => {
  const { name, user_id } = req.body;
  const join_code = generateRandomString(); //makes a random 9 digit join code
  if (!name) {
    throw createError(400, "required argument is missing");
  }
  try {
    const group = await prisma.group.create({
      data: {
        name: name,
        join_code: join_code,
        members: {
          connect: { id: user_id }, //adds current user into the group by default
        },
      },
    });

    return res.send({ group });
  } catch (error) {
    throw createError(
      500,
      error instanceof Error ? error.message : "Unknown error",
    );
  }
};

//retrieves group by id

type GetGroupsParam = {
  userId: string;
};

type GetGroupsRes = {
  groups:
    | ({
        groups: {
          id: number;
          name: string;
          createdAt: Date;
          updatedAt: Date;
          join_code: string | null;
        }[];
      } & {
        id: number;
        username: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
      })
    | null;
};

export const getGroups = async (
  req: Request<GetGroupsParam>,
  res: Response<GetGroupsRes>,
) => {
  const { userId } = req.params;
  if (!userId) throw createError(400, "required argument is missing");
  try {
    const groups = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      include: { groups: true },
    });

    res.end(groups);
  } catch (error) {
    throw createError(
      500,
      error instanceof Error ? error.message : "Unknown error",
    );
  }
};

//Update or change group name or add/delete users

type JoinGroupParam = {
  user_id: string;
  join_code: string;
};

type JoinGroupRes = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  join_code: string | null;
};

export const joinGroup = async (
  req: Request<JoinGroupParam>,
  res: Response<JoinGroupRes>,
) => {
  const { user_id, join_code } = req.params;
  if (!join_code) {
    throw createError(400, "required argument is missing");
  }
  try {
    const updatedGroup = await prisma.group.update({
      where: { join_code: join_code }, //searches by join code
      data: {
        members: {
          connect: { id: Number(user_id) }, //adds user with the given user_id
        },
      },
    });

    res.send(updatedGroup);
  } catch (error) {
    throw createError(
      500,
      error instanceof Error ? error.message : "Unknown error",
    );
  }
};

type LeaveGroupParam = {
  user_id: string;
  group_id: string;
};

type LeaveGroupRes = JoinGroupRes;

export const leaveGroup = async (
  req: Request<LeaveGroupParam>,
  res: Response<LeaveGroupRes>,
) => {
  const { user_id, group_id } = req.params;
  if (!group_id) {
    throw createError(400, "required argument is missing");
  }
  try {
    const updatedGroup = await prisma.group.update({
      where: { id: Number(group_id) }, //finds by group id
      data: {
        members: {
          disconnect: { id: Number(user_id) }, //use disconnect to remove user_id from this group
        },
      },
    });
    res.status(200).send(updatedGroup);
  } catch (error) {
    throw createError(
      500,
      error instanceof Error ? error.message : "Unknown error",
    );
  }
};

type ChangeGroupParam = {
  group_id: string;
  newName: string;
};

type ChangeGroupRes = JoinGroupRes;

export const changeGroupName = async (
  req: Request<ChangeGroupParam>,
  res: Response<ChangeGroupRes>,
) => {
  const { group_id, newName } = req.params;
  if (!group_id) {
    throw createError(400, "required argument is missing");
  }
  try {
    const updatedGroup = await prisma.group.update({
      where: { id: Number(group_id) }, //searches by group_id
      data: {
        name: newName, //changes name to newName
      },
    });
    res.status(200).send(updatedGroup);
  } catch (error) {
    throw createError(
      500,
      error instanceof Error ? error.message : "Unknown error",
    );
  }
};
