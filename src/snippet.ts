import { transform, transformation } from "./transformations";
import { parse } from "node-html-parser";

export function defSnippet(htmlData: string, selector: string, transforms: [string, transformation][]) {
  return (context?: Record<string, unknown>) => {
    const parsedHtml = parse(htmlData);
    const snippetHtml = parsedHtml.querySelector(selector) as HTMLElement | null;

    transforms.forEach(([selector, transformation]) => {
      if(selector === "self") {
        transform(snippetHtml, transformation, context);
      } else {
        const node = snippetHtml?.querySelector(selector) as HTMLElement | null;
        transform(node, transformation, context);
      }
    });

    return snippetHtml;
  };
}