import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

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
export const createGroup = async (req: Request, res: Response) => {
  const { name, user_id } = req.body;
  const join_code = generateRandomString(); //makes a random 9 digit join code
  if (!name) {
    return res
      .status(400)
      .json({
        error: "Bad Request",
        message: "required fields are missing",
        missingFields: {
          name: !name,
          user_id: !user_id,
        },
      })
      .send();
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

    return res.status(201).json({
      message: "Created",
      data: group,
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: "Internal Server Error", //internal server error but could also be bc of duplicate join codes
        message: error,
      })
      .send();
  }
};

//retrieves group by id
export const getGroups = async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).send("No eventId added");
  try {
    const groups = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      include: { groups: true },
    });

    res.status(200).send(groups);
  } catch (err) {
    res.status(400).send(err);
  }
};

//Update or change group name or add/delete users
export const joinGroup = async (req: Request, res: Response) => {
  const { user_id, join_code } = req.params;
  if (!join_code) {
    return res
      .status(400)
      .json({
        error: "Bad Request",
        message: "required fields are missing",
        missingFields: {
          join_code: !join_code,
          user_id: !user_id,
        },
      })
      .send();
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
    res.status(200).send(updatedGroup);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const leaveGroup = async (req: Request, res: Response) => {
  const { user_id, group_id } = req.params;
  if (!group_id) {
    return res
      .status(400)
      .json({
        error: "Bad Request",
        message: "required fields are missing",
        missingFields: {
          group_id: !group_id,
          user_id: !user_id,
        },
      })
      .send();
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
  } catch (err) {
    res.status(400).send(err);
  }
};

export const changeGroupName = async (req: Request, res: Response) => {
  const { group_id, newName } = req.params;
  if (!group_id) {
    return res
      .status(400)
      .json({
        error: "Bad Request",
        message: "required fields are missing",
        missingFields: {
          group_id: !group_id,
        },
      })
      .send();
  }
  try {
    const updatedGroup = await prisma.group.update({
      where: { id: Number(group_id) }, //searches by group_id
      data: {
        name: newName, //changes name to newName
      },
    });
    res.status(200).send(updatedGroup);
  } catch (err) {
    res.status(400).send(err);
  }
};
