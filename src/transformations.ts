import { HTMLElement } from "node-html-parser";

/**
 * Append a child node to node as a side effect, mutating node in place.
 * @param node
 * @param child
 */
export function append(node: HTMLElement, child: HTMLElement) {
  node.appendChild(child);
}
