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

  test("advanced case", () => {
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
});
