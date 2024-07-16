import { faker } from "@faker-js/faker";
import request from "supertest";

import app from "../app";
import * as userArgs from "../types/api/user/userArgs";

/* takes testing data and a debug mode */
export const testCreateUser = (
  goodCreateBody: userArgs.createUserBody,
  debug: boolean,
) => {
  /* should succeed */
  describe("test-create", () => {
    test("creating account", (done) => {
      request(app)
        .post("/user/")
        .send(goodCreateBody)
        .then((response) => {
          try {
            if (debug) console.log(response.body);
            expect(response.statusCode).toBe(201);
            done();
          } catch (error) {
            done(error);
          }
        });
    });

    /* should fail when creating with existing data */
    test("creating with existing data", (done) => {
      request(app)
        .post("/user/")
        .send(goodCreateBody)
        .then((response) => {
          try {
            if (debug) console.log(response.body);
            expect(response.statusCode).toBe(400);
            done();
          } catch (error) {
            done(error);
          }
        });
    });

    /* should fail to create with a non-email */
    test("inputting bad email", (done) => {
      const body: userArgs.createUserBody = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      request(app)
        .post("/user/")
        .send(body)
        .then((response) => {
          try {
            if (debug) console.log(response.body);
            expect(response.statusCode).toBe(400);
            done();
          } catch (error) {
            done(error);
          }
        });
    });

    /* should fail with new data and existing email */
    test("inputting existing email", (done) => {
      const body: userArgs.createUserBody = {
        username: faker.internet.userName(),
        email: goodCreateBody.email,
        password: faker.internet.password(),
      };
      request(app)
        .post("/user/")
        .send(body)
        .then((response) => {
          try {
            if (debug) console.log(response.body);
            expect(response.statusCode).toBe(400);
            done();
          } catch (error) {
            done(error);
          }
        });
    });

    /* should fail with new data and existing username */
    test("inputting existing username", (done) => {
      const body = {
        username: goodCreateBody.username,
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      request(app)
        .post("/user/")
        .send(body)
        .then((response) => {
          try {
            if (debug) console.log(response.body);
            expect(response.statusCode).toBe(400);
            done();
          } catch (error) {
            done(error);
          }
        });
    });

    /* should fail */
    test("inputting bad data", (done) => {
      const body = {
        username: 123454321,
        email: "not a email",
        password: faker.internet.password(),
      };
      request(app)
        .post("/user/")
        .send(body)
        .then((response) => {
          try {
            if (debug) console.log(response.body);
            expect(response.statusCode).toBe(400);
            done();
          } catch (error) {
            done(error);
          }
        });
    });

    /* should fail */
    test("inputting long data", (done) => {
      const body = {
        username: 123454321,
        email: faker.lorem.words(200),
        password: faker.internet.password(),
      };
      request(app)
        .post("/user/")
        .send(body)
        .then((response) => {
          try {
            if (debug) console.log(response.body);
            expect(response.statusCode).toBe(400);
            done();
          } catch (error) {
            done(error);
          }
        });
    });
  });
};
