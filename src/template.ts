import { transform, transformation } from "./transformations";
import { parse } from "node-html-parser";

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
