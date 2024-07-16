import request from "supertest";

import app from "../app";
import * as input from "./testInput";
import * as userArgs from "../types/api/user/userArgs"


/* takes good and bad data                                   */
/* - should be independent of each other for accurate testing*/
export const testCreateUser = (goodCreateBody: userArgs.createUserBody, badCreateBody: userArgs.createUserBody) => {
  /* should succeed */
  describe("test-create", () => {
    test("creating account", (done) => {
      request(app)
        .post("/user/")
        .send(goodCreateBody)
        .then((response) => {
          if (!response.body) console.log(response.body);
          expect(response.statusCode).toBe(201);
          done();
        });
    });

    /* should fail when creating with existing data */
    test("creating with existing data", (done) => {
      request(app)
        .post("/user/")
        .send(goodCreateBody)
        .then((response) => {
          expect(response.statusCode).toBe(400);
          done();
        });
    });

    /* should fail to create with a non-email */
    test("inputting bad email", (done) => {
      request(app)
        .post("/user/")
        .send({
          username: badCreateBody.,
          email: "notAnEmail",
          password: badRequestBody.password,
        })
        .then((response) => {
          console.log(response.body);
          expect(response.statusCode).toBe(400);
          done();
        });
    });

    test("inputting existing email", (done) => {
      request(app)
        .post("/user/")
        .send({
          username: badRequestBody.username,
          email: ,
          password: badRequestBody.password,
        })
        .then((response) => {
          console.log(response.body);
          expect(response.statusCode).toBe(400);
          done();
        });
    });
  });
};
