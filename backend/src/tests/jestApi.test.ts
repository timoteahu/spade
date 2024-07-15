// import bcrypt from "bcrypt";
// import { response } from "express";
import jwt from "jsonwebtoken";
import request from "supertest";

import app from "../app";
import prisma from "../utils/prisma";

// const getHash = (pass: string) => {
//   bcrypt.hash(pass, 10);
// };

const inputUserData = {
  username: "user1",
  email: "testemail@gmail.com",
  password: "verysecure",
  id: 0,
  token: "",
};

const userGroupId = 4;

const header = {
  authorization: "",
};

const getUserId = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return user?.id;
};

beforeAll(async () => {
  await prisma.user.delete({
    where: {
      username: inputUserData.username,
    },
  });
});

describe("Test the root path", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

/* ==== test User ==== */
/* test create account */
const createUserBody = {
  username: inputUserData.username,
  email: inputUserData.email,
  password: inputUserData.password,
};
describe("test-create", () => {
  test("creating account", (done) => {
    request(app)
      .post("/user/")
      .send(createUserBody)
      .then((response) => {
        if (!response.body) console.log(response.body);
        expect(response.statusCode).toBe(201);
        done();
      });
  });
  test("creating with existing data", (done) => {
    request(app)
      .post("/user/")
      .send(createUserBody)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
});
/* test login */
const loginUserBody = {
  email: inputUserData.email,
};
describe("test-login", () => {
  test("testing login", (done) => {
    request(app)
      .post("/user/login")
      .send(loginUserBody)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("token/id-tests", () => {
  /* signs token*/
  beforeAll(async () => {
    const id = await getUserId(inputUserData.username);
    const payload = {
      userId: id,
    };
    const secret = process.env?.JWT_SECRET;
    if (secret) inputUserData.token = jwt.sign(payload, secret);
    if (typeof id === "number") inputUserData.id = id;
    header.authorization = `Bearer ${inputUserData.token}`;
  });

  describe("test-join", () => {
    test("testing join", (done) => {
      request(app)
        .post("/user/join")
        .send({ groupId: userGroupId })
        .set(header)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });

  describe("test-leave", () => {
    test("testing leave", (done) => {
      request(app)
        .post("/user/leave")
        .send({ groupId: userGroupId })
        .set(header)
        .then((response) => {
          try {
            expect(response.statusCode).toBe(200);
          } catch (error) {
            console.log(response.body);
            done(error);
          }
          done();
        });
    });
  });
});
