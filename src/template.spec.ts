import { defTemplate } from "./template";
import fs from "fs";
import { defSnippet } from "./snippet";

describe(defTemplate, () => {
  test("simple case", () => {
    expect(defTemplate).toBeInstanceOf(Function);

    const template = defTemplate("<head><title></title></head>", [
      ["head title", "foobar"],
    ]);
    expect(template).toBeInstanceOf(Function);
    expect(template()).toEqual(expect.any(String));
    expect(template()).toEqual("<head><title>foobar</title></head>");
  });

  test("multiple transformations", () => {
    const template = defTemplate(
      "<body><article><h1></h1><ul></ul></article></body>",
      [
        ["article h1", "foobar"],
        ["ul", "<li>hello</li>"],
      ]
    );

    expect(template()).toEqual(
      "<body><article><h1>foobar</h1><ul><li>hello</li></ul></article></body>"
    );
  });

  test("transformation can be a function with a context", () => {
    const template = defTemplate("<p></p>", [
      [
        "p",
        (htmlElement, context) => {
          if (context && typeof context.foo === "string") {
            htmlElement.innerHTML = context.foo;
          }
        },
      ],
    ]);
    expect(template({ foo: "foobar" })).toEqual("<p>foobar</p>");
  });

  test("transformation is not executed if node is null", () => {
    const template = defTemplate("<p></p>", [["a", "foobar"]]);
    expect(template()).toEqual("<p></p>");
  });

  describe("enlive tutorial", () => {
    it("should handle template1 use case", () => {
      const data = fs.readFileSync(
        "./resources/test-templates/template1.html",
        "utf8"
      );
      const template = defTemplate(data, [
        [
          "p#message",
          (node, context) => {
            node.innerHTML = <string>context?.message;
          },
        ],
      ]);
      expect(typeof template({ message: "foo" })).toBe("string");
      expect(template({ message: "foo" })).toContain('<p id="message">foo</p>');
    });

    it("should handle template2 use case", () => {
      const data = fs.readFileSync(
        "./resources/test-templates/template2.html",
        "utf8"
      );

      const linkSelector = ".content:nth-of-type(1) > *:first-child";
      const linkModel = defSnippet(data, linkSelector, [
        [
          "a",
          (node, context) => {
            node.innerHTML = <string>context?.text;
            node.setAttribute("href", <string>context?.href);
          },
        ],
      ]);
      const linkSnippet = linkModel({ text: "foo", href: "#bar" });
      expect(linkSnippet?.toString()).toContain(
        '<a target="new" href="#bar">foo</a>'
      );

      const data2 = fs.readFileSync(
        "./resources/test-templates/template2.html",
        "utf8"
      );
      const sectionModel = defSnippet(data2, ".title", [
        [
          "self",
          (node, context) => {
            node.innerHTML = <string>context?.title;
          },
        ],
      ]);
      const sectionSnippet = sectionModel({ title: "baz" });
      expect(sectionSnippet?.toString()).toContain(
        '<h2 class="title">baz</h2>'
      );

      const template = defTemplate(data, [
        [
          "h2",
          (node, context) => {
            node.innerHTML = sectionModel(context)?.toString() || "";
          },
        ],
      ]);
      expect(typeof template({ title: "hello" })).toBe("string");
      expect(template({ title: "hello" })).toContain(
        '<h2 class="title">hello</h2>'
      );
    });
  });
});
