import { parse } from "node-html-parser";

export function deftemplate(htmlData: string, mappings: [string, string][]) {
  return (_context?: Object) => {
    const parsedHtml = parse(htmlData);

    mappings.forEach(([selector, replacement]) => {
      const node = parsedHtml.querySelector(selector);
      if (node) {
        node.innerHTML = replacement;
      }
    });

    return parsedHtml.toString();
  };
}
