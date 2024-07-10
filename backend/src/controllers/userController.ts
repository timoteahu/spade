import { Request, Response } from "../utils/api";
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
export const upsertUser = async (
  req: Request<EmptyObject, UpsertUserBody>,
  res: Response<UpsertUserResponse>,
) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ error: "Email not found" });
  }

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
    return res.status(400).send();
  }
};
