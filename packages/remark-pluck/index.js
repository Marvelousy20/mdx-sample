import { visit } from "unist-util-visit";
const SKIP = "skip";

// learned how to make this here https://unifiedjs.com/learn/recipe/remove-node/
export const pluck = (table, selector) => {
  visit(table, selector, (node, index, ancestor) => {
    ancestor.children.splice(index, 1, ...node.children);
    return [SKIP, index];
  });
  return;
};

export default pluck;
