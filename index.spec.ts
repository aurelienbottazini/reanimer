import { hello } from "./index";

test("Hello world", () => {
  expect(hello()).toBe("Hello world! ");
});
