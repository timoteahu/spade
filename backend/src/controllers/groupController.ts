import { NextFunction } from "express";

import * as GroupType from "../types/GroupTypes";
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
  req: GroupType.CreateGroupRequest,
  res: GroupType.CreateGroupResponse,
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
export const getGroup = async (
  req: GroupType.GetGroupRequest,
  res: GroupType.GetGroupResponse,
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
