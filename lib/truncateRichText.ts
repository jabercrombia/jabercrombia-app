import { Document, Block, Inline } from "@contentful/rich-text-types";

/**
 * Recursively extract text from Contentful rich text nodes
 */
function extractText(nodes: Block[] | Inline[]): string {
  if (!nodes) return "";
  return nodes
    .map((node: any) => {
      if (node.nodeType === "text") return node.value;
      if (node.content) return extractText(node.content);
      return "";
    })
    .join(" ");
}

/**
 * Generate an excerpt from a Contentful rich text document
 * @param doc Contentful Document
 * @param maxLength Max characters
 */
export function truncateRichText(doc: Document, maxLength = 130): string {
  if (!doc || !doc.content) return "";

  const text = extractText(doc.content);


  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength).trim() + "…";
}
