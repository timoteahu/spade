import { Request, Response } from "express";
import jwt from "jsonwebtoken";

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
  token: string;
};

// TODO: Reimplement with authentication
export const upsertUser = async (
  req: Request<EmptyObject, UpsertUserBody>,
  res: Response<UpsertUserResponse>,
) => {
  const { email, username } = req.body;

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

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      },
    );

    return res.send({ ...user, token });
  } catch (e) {
    return res.status(400).send();
  }
};
