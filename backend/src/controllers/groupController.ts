import { NextFunction, Response } from "express";

import { createError } from "../middleware/handleErrors";
import * as groupTypes from "../types/api/group/groupExpress";
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
  req: groupTypes.createGroupRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const name = req.body.name;
    const userId = req?.payload?.userId;

    if (!name || !userId)
      throw createError(400, "Required argument not provided");

    const join_code = generateRandomString(); //makes a random 9 digit join code

    const group = await prisma.group.create({
      data: {
        name: name,
        join_code: join_code,
        members: {
          connect: { id: parseInt(userId) }, //adds current user into the group by default
        },
      },
    });
    return res.status(201).send(group);
  } catch (error) {
    next(error);
  }
};

//retrieves group by id
export const getUserGroups = async (
  req: groupTypes.getUserGroupsRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;

    if (!userId) throw createError(400, "User ID is required");

    const userWithGroups = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      include: { groups: { include: { members: true, events: true } } },
    });

    if (!userWithGroups) throw createError(404, "User not found");

    res.status(200).json(userWithGroups.groups);
  } catch (error) {
    next(error);
  }
};

export const getGroupById = async (
  req: groupTypes.getGroupByIdRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { groupId } = req.params;

    if (!groupId) throw createError(400, "Group ID is required");

    const group = await prisma.group.findUnique({
      where: {
        id: parseInt(groupId),
      },
      include: { members: true, events: true },
    });

    if (!group) throw createError(404, "Group not found");

    res.status(200).json(group);
  } catch (error) {
    next(error);
  }
};
