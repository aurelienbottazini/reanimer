import { append } from "./transformations";
import { parse } from "node-html-parser";

describe(append, () => {
  it("should append to the dom", () => {
    const dom = parse("<div></div>");
    const child = parse("<p></p>");
    dom.firstChild;
    const node = dom.querySelector("div");
    if (node) {
      append(node, child);
      expect(node.childNodes.length).toBe(1);
    }
  });
});
