import { transform, transformation } from "./transformations";
import { parse } from "node-html-parser";

export function defSnippet(htmlData: string, transforms: [string, transformation][]) {
  return (context?: Record<string, unknown>) => {
    const parsedHtml = parse(htmlData);

    transforms.forEach(([selector, transformation]) => {
      const node = parsedHtml.querySelector(selector) as HTMLElement | null;
      transform(node, transformation, context);
    });

    return parsedHtml;
  };
}