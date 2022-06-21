import { parse } from "node-html-parser";
import { HTMLElement } from "node-html-parser";

type mappingTransform = string | ((htmlElement: HTMLElement, context?: Record<string, unknown>) => void);

export function deftemplate(
  htmlData: string,
  mappings: [string, mappingTransform][]
) {
  return (context?: Record<string, unknown>) => {
    const parsedHtml = parse(htmlData);

    mappings.forEach(([selector, replacement]) => {
      const node = parsedHtml.querySelector(selector);
      transform(node, replacement, context);
    });

    return parsedHtml.toString();
  };
}

function transform(
  htmlElement: HTMLElement | null,
  mappingTransform: mappingTransform,
  context?: Record<string, unknown>
) {
  if (htmlElement === null) {
    return;
  }

  if (typeof mappingTransform === "string") {
    htmlElement.innerHTML = mappingTransform;
    return;
  }

  mappingTransform(htmlElement, context);
}
