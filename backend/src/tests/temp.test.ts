import * as input from "./testInput";
import { clearTestUsers } from "./testUtils";
import * as userTests from "./userTests";

/* will hold all tests */
beforeAll(async () => {
  await clearTestUsers(input.inputUserData.username);
});

describe("Run Tests", () => {
  userTests.testCreateUser(input.inputUserData, true);
});

afterAll(async () => {
  await clearTestUsers(input.inputUserData.username);
});
