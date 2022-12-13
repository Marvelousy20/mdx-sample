import { toc } from "mdast-util-toc";
import { map } from "unist-util-map";
import pluck from "remark-pluck";

// WHAT THIS DOES:

// make a table of contents.
// map the table of contents replacing
// each of the elements with an MDX alternative
// so they can be replaced in the normal MDX component mapping.

export const remarkEndWithCodeBlock = (content) => {
  return (tree) => {
    const codeBlock = {
      type: "code",
      lang: "md",
      meta: "null",
      value: content,
    };
    tree.children = tree.children.concat(codeBlock);
  };
};

export default remarkEndWithCodeBlock;
