import { deftemplate } from "./template.ts";

test("deftemplate", () => {
  expect(deftemplate).toBeInstanceOf(Function);
  expect(deftemplate()).toBeInstanceOf(Function);
});
