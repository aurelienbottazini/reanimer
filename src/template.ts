import { parse } from "node-html-parser";

/**
 * A transformation can be:
 * - a string: it will replace the html at that selector in that case
 * - a function: it will be called with the html node and the _context_
 * and is expected to have side effects on the html node
 */
export type transformation =
  | string
  | ((htmlElement: HTMLElement, context?: Record<string, unknown>) => void);

function transform(
  htmlElement: HTMLElement | null,
  transformation: transformation,
  context?: Record<string, unknown>
) {
  if (htmlElement === null) {
    return;
  }

  if (typeof transformation === "string") {
    htmlElement.innerHTML = transformation;
    return;
  }

  transformation(htmlElement, context);
  return;
}

/**
 * Given some htmlData and a set of transforms returns a function
 * transforming the htmlData using provided transforms.
 *
 * The returned function accepts a _context_ parameter that will be passed to
 * the transformation function if provided.
 *
 * Each transform is a tuple consisting of a CSS selector and a transformation.
 * Transformations mutate the dom in place.
 */
export function defTemplate(
  htmlData: string,
  transforms: [string, transformation][]
) {
  return (context?: Record<string, unknown>) => {
    const parsedHtml = parse(htmlData);

    transforms.forEach(([selector, transformation]) => {
      const node = parsedHtml.querySelector(selector) as HTMLElement | null;
      transform(node, transformation, context);
    });

    return parsedHtml.toString();
  };
}
