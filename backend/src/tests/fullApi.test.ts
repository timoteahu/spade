import request from "supertest";

import app from "../app";
import prisma from "../utils/prisma";
import {
  createEventBody,
  createGroupBody,
  createUserBody,
  getToken,
  inputGroupData,
  inputUserData,
  loginUserBody,
} from "./testInput";

beforeAll(async () => {
  try {
    await prisma.user.delete({
      where: {
        username: inputUserData.username,
      },
    });
  } catch (error) {
    console.log("no users to delete");
  }
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
          try {
            expect(response.body).toHaveProperty("join_code");
            expect(response.body).toHaveProperty("name", inputGroupData.name);
            expect(response.body).toHaveProperty("id");
            expect(response.statusCode).toBe(201);

            // set id to test
            inputGroupData.id = response.body.id;
            createEventBody.groupId = response.body.id;
            done();
          } catch (error) {
            done(error);
          }
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
          try {
            expect(response.headers).toHaveProperty("authorization");
            expect(response.statusCode).toBe(200);
            done();
          } catch (error) {
            done(error);
          }
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
        .send({ groupId: inputGroupData.id })
        .set(inputUserData.headers)
        .then((response) => {
          try {
            expect(response.body).toStrictEqual({
              groupId: inputGroupData.id,
            });
            expect(response.statusCode).toBe(200);
            done();
          } catch (error) {
            done(error);
          }
        });
    });
  });

  /* ----test create-event ----  */
  /* tests:                      */
  /* - status code               */
  /* - return Body               */
  describe("test-events", () => {
    describe("test-create", () => {
      test("creating event", (done) => {
        request(app)
          .post(`/event/${inputGroupData.id}`)
          .send(createEventBody)
          .set(inputUserData.headers)
          .then((response) => {
            try {
              inputGroupData.eventId = response.body.id;
              expect(response.statusCode).toBe(201);
              done();
            } catch (error) {
              console.log(response.body);
              done(error);
            }
          });
      });
    });

    describe("test-delete", () => {
      test("deleting event", (done) => {
        request(app)
          .delete(`/event/${inputGroupData.eventId}`)
          .send(createEventBody)
          .set(inputUserData.headers)
          .then((response) => {
            try {
              expect(response.statusCode).toBe(200);
              done();
            } catch (error) {
              console.log(response.body);
              done(error);
            }
          });
      });
    });
  });

  /* tests:             */
  /* - status code      */
  /* - return Body      */
  describe("test-leave", () => {
    test("testing leave", (done) => {
      request(app)
        .post("/user/leave")
        .set(inputUserData.headers)
        .send({ groupId: inputGroupData.id })
        .then((response) => {
          try {
            expect(response.statusCode).toBe(200);
            expect(response.body).toStrictEqual({
              groupId: inputGroupData.id,
            });
            done();
          } catch (error) {
            console.log(response.body);
            done(error);
          }
        });
    });
  });
});

afterAll(async () => {
  console.log("deleting created objects ");
  try {
    await prisma.event.deleteMany({
      where: {
        groupId: inputGroupData.id,
      },
    });

    await prisma.group.deleteMany({
      where: {
        name: inputGroupData.name,
      },
    });
  } catch (error) {
    console.log("no groups to delete");
  }
});
