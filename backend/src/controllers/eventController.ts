import { Request, Response } from "express";

import prisma from "../utils/prisma";

/* Error codes */
// 201 - created
// 400 - bad request
// 403 - forbidden
// 401 - unauthorized
// 405 - method not allowed
// 500 - Internal Server Error

/* event schema */
// id          Int      @id @default(autoincrement())
// title       String
// description String?
// groupId     Int
// group       Group    @relation(fields: [groupId], references: [id])
// createdAt   DateTime @default(now())
// updatedAt   DateTime @updatedAt

export const createEvent = async (req: Request, res: Response) => {
  /* parse body*/
  const { title, description, groupId } = req.body;

  /* missing field error */
  if (!title) {
    return res
      .status(400)
      .json({
        error: "Bad Request",
        message: "required fields are missing",
        missingFields: {
          title: !title,
          groupId: !groupId,
        },
      })
      .send();
  }

  /* add to database */
  try {
    // create from prisma schema
    const event = await prisma.event.create({
      data: {
        title: title,
        description: description,
        groupId: groupId,
      },
    });

    // send status to api user
    return res.status(201).send(event);
  } catch (e) {
    return res
      .status(500)
      .json({
        error: "Internal Server Error",
        message: e,
      })
      .send();
  }
};
