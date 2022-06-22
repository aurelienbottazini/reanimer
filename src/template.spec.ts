import { deftemplate } from "./template";

describe(deftemplate, () => {
  test("simple case", () => {
    expect(deftemplate).toBeInstanceOf(Function);

    const template = deftemplate("<head><title></title></head>", [
      ["head title", "foobar"],
    ]);
    expect(template).toBeInstanceOf(Function);
    expect(template()).toEqual(expect.any(String));
    expect(template()).toEqual("<head><title>foobar</title></head>");
  });

  test("multiple transformations", () => {
    const template = deftemplate(
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
    const template = deftemplate("<p></p>", [
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
});
