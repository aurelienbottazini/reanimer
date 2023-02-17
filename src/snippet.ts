import { transform, transformation } from "./transformations";
import { parse } from "node-html-parser";

function applySelector(parsedHtml: HTMLElement | null, selector: string, transforms: [string, transformation][], context: Record<string, unknown> | undefined) {
  const snippetHtml = parsedHtml?.querySelector(selector) as HTMLElement | null;

  transforms.forEach(([selector, transformation]) => {
    if (selector === "self") {
      transform(snippetHtml, transformation, context);
    } else {
      const wrapper = parse("<div></div>") as unknown as HTMLElement;
      if (snippetHtml) {
        wrapper.appendChild(snippetHtml);
      }
      const node = wrapper.querySelector(selector) as HTMLElement | null;
      transform(node, transformation, context);
    }
  });

  return snippetHtml;
}

export function defSnippet(htmlData: string, selectors: string | string[], transforms: [string, transformation][]) {
  return (context?: Record<string, unknown>) => {

    if (typeof selectors === "string") {
      selectors = [selectors];
    }

    const parsedHtml = parse(htmlData) as unknown as HTMLElement;
    const result : HTMLElement[] = [];
    selectors.forEach(selector => {
      const items = applySelector(parsedHtml, selector, transforms, context);
      if (items) {
        result.push(items);
      }
    });

    result.join = Array.prototype.join.bind(result, '');
    return result;
  };
}