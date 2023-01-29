import { defSnippet } from "./snippet";
describe("defSnippet", () => {
  it("should be a function", () => {
    expect(defSnippet).toBeInstanceOf(Function);
  });
});