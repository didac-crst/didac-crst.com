/**
 * Wrap <table> nodes in <div class="table-scroll"> so wide tables
 * can scroll horizontally without breaking page layout, while the
 * table itself stays centered when narrower than the article.
 */
function wrapTables(nodes) {
  if (!Array.isArray(nodes)) return;

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    if (!node || node.type !== "element") continue;

    if (node.tagName === "table") {
      const className = node.properties?.className;
      const alreadyWrapped =
        typeof className === "string"
          ? className.includes("table-scroll")
          : Array.isArray(className) && className.includes("table-scroll");

      if (!alreadyWrapped) {
        nodes[i] = {
          type: "element",
          tagName: "div",
          properties: {
            className: ["table-scroll"]
          },
          children: [node]
        };
      }
      continue;
    }

    if (Array.isArray(node.children)) {
      wrapTables(node.children);
    }
  }
}

export function rehypeWrapTables() {
  return (tree) => {
    wrapTables(tree.children);
  };
}
