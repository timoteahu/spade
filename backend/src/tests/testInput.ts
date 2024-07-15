import jwt from "jsonwebtoken";

import prisma from "../utils/prisma";

export const inputUserData = {
  username: "user1",
  email: "testemail@gmail.com",
  password: "verysecure",
  id: 0,
  token: "",
  headers: {
    authorization: "",
  },
  userGroupId: 4,
};

export const inputGroupData = {
  id: 0,
  name: "group1",
  joinCode: 0,
};

/* ================================================== */
export const createUserBody = {
  email: inputUserData.email,
  username: inputUserData.username,
  password: inputUserData.password,
};

export const loginUserBody = {
  email: inputUserData.email,
};

export const createGroupBody = {
  name: inputGroupData.name,
};

export const createEventBody = {
  title: "Event 1",
  description: "Event description...",
  groupId: inputGroupData.id,
};

type tokenPayload = {
  userId: number;
};
/* ================================================== */
export const getUserId = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return user?.id;
};

export const getToken = async (username: string) => {
  const id = await getUserId(username);
  const payload: tokenPayload = {
    userId: id!,
  };
  const secret = process.env?.JWT_SECRET;
  if (secret)
    inputUserData.token = jwt.sign(payload, secret, { expiresIn: "1h" });
  if (typeof id === "number") inputUserData.id = id;
  inputUserData.headers.authorization = `Bearer ${inputUserData.token}`;
  return inputUserData.headers.authorization;
};
