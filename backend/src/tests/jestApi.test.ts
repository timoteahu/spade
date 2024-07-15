import request from "supertest";

import app from "../app";

/* test the main path */
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

/* test the routes */
const createUserBody = {
  username: "basicUser",
  email: "testemail@gmail.com",
  password: "verysecure101",
};
/* test create account */
describe("Test Account Creation", () => {
  test("It should response 201, and a token", (done) => {
    request(app)
      .post("/user/")
      .send(createUserBody)
      .then((response) => {
        console.log(response.body);
        expect(response.statusCode).toBe(201);
        done();
      });
  });
});
