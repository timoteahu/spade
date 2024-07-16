import * as input from "./testInput";
import { clearTestUsers } from "./testUtils";
import * as userTests from "./userTests";

beforeAll(async () => {
  await clearTestUsers(input.inputUserData.username);
});

describe("Run Tests", () => {
  userTests.testCreateUser();
});
