import { hello } from "./index.ts";

test("Hello world", () => {
  expect(hello()).toBe("Hello world! ");
});
