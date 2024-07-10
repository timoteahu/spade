import { Request, Response } from "express";

import prisma from "../utils/prisma";
import { EmptyObject } from "../utils/types";

type UpsertUserBody = {
  email: string;
};

type UpsertUserResponse = {
  id: bigint;
  email: string;
};

// TODO: Reimplement with authentication
export const upsertUser = async (req: Request, res: Response) => {
  /* parse request body */
  const { email } = req.body;

  /* error messages */
  if (!email) {
    return res.status(400).send({ error: "Email not found" });
  }

  /* edit db */
  try {
    const user = await prisma.user.upsert({
      where: { email: email },
      create: { email: email, username: "TODO" },
      update: {},
      select: {
        id: true,
        email: true,
      },
    });

    return res.send(user);
  } catch (e) {
    return res.status(400).send(e);
  }
};
