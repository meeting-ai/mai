import { hello } from "../src/handler";

describe("hello", () => {
  test(`the handler exists`, () => {
    expect(hello).toBeTruthy();
  });
});
