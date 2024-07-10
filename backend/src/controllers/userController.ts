import { Request, Response } from "express";

import prisma from "../utils/prisma";
import { EmptyObject } from "../utils/types";

type UpsertUserBody = {
  email: string;
  username: string;
};

type UpsertUserResponse = {
  id: number;
  email: string;
  username: string;
};

// TODO: Reimplement with authentication
export const upsertUser = async (
  req: Request<EmptyObject, UpsertUserBody>,
  res: Response<UpsertUserResponse>,
) => {
  console.log("CALL");
  const { email, username } = req.body;

  console.log("email: ", email); // Add this line to log the email
  console.log("username: ", username); // Add this line to log the username
  if (!email) {
    return res.status(400).send();
  }

  /* edit db */
  try {
    const user = await prisma.user.upsert({
      where: { email: email },
      create: { email: email, username: username },
      update: {},
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    console.log("FINISHED");
    return res.send(user);
  } catch (e) {
    return res.status(400).send();
  }
};
