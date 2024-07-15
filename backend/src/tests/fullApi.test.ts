import request from "supertest";

import app from "../app";
import prisma from "../utils/prisma";
import {
  createGroupBody,
  createUserBody,
  getToken,
  inputGroupData,
  inputUserData,
  loginUserBody,
} from "./testInput";

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

/* tests that require a known userid/token*/
describe("token/id-tests", () => {
  /* signs token*/
  beforeAll(async () => {
    await getToken(inputUserData.username);
  });

  /* ----test createGroup---- */
  /* tests:                   */
  /* - status code            */
  describe("test-createGroup", () => {
    test("testing create group", (done) => {
      request(app)
        .post("/group")
        .send(createGroupBody)
        .set(inputUserData.headers)
        .then((response) => {
          expect(response.body).toHaveProperty("join_code");
          expect(response.body).toHaveProperty("name", inputGroupData.name);
          expect(response.body).toHaveProperty("id");
          expect(response.statusCode).toBe(201);
          done();
        });
    });
  });

  /* ----test login---- */
  /* tests:             */
  /* - auth header      */
  /* - status code      */
  describe("test-login", () => {
    test("testing login", (done) => {
      request(app)
        .post("/user/login")
        .send(loginUserBody)
        .then((response) => {
          expect(response.headers).toHaveProperty("authorization");
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });
  /* ----test join----  */
  /* tests:             */
  /* - status code      */
  /* - return Body      */
  describe("test-join", () => {
    test("testing join", (done) => {
      request(app)
        .post("/user/join")
        .send({ groupId: inputUserData.userGroupId })
        .set(inputUserData.headers)
        .then((response) => {
          expect(response.body).toStrictEqual({
            groupId: inputUserData.userGroupId,
          });
          expect(response.statusCode).toBe(200);
          done();
        });
    });
  });
  /* ----test join----  */
  /* tests:             */
  /* - status code      */
  /* - return Body      */
  describe("test-leave", () => {
    test("testing leave", (done) => {
      request(app)
        .post("/user/leave")
        .send({ groupId: inputUserData.userGroupId })
        .set(inputUserData.headers)
        .then((response) => {
          try {
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({
              groupId: inputUserData.userGroupId,
            });
            done();
          } catch (error) {
            done(error);
          }
        });
    });
  });
});

afterAll(async () => {
  await prisma.group.deleteMany({
    where: {
      name: inputGroupData.name,
    },
  });
});
