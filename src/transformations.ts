/**
 * Append a child node to node as a side effect, mutating node in place.
 * @param node
 * @param child
 */
export function append(node: HTMLElement, child: HTMLElement) {
  node.appendChild(child);
}

/**
 * A transformation can be:
 * - a string: it will replace the html at that selector in that case
 * - a function: it will be called with the html node and the _context_
 * and is expected to have side effects on the html node
 */
export type transformation =
  | string
  | ((htmlElement: HTMLElement, context?: Record<string, unknown>) => void);

export function transform(
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
