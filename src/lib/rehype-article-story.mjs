/**
 * Wrap markdown/MDX content before the first <h2> in
 * <div class="article-story"> for narrative lead styling.
 *
 * Opt out per article with frontmatter: storyLead: false
 */
export function rehypeArticleStory() {
  return (tree, file) => {
    const frontmatter =
      file?.data?.astro?.frontmatter ?? file?.data?.frontmatter ?? {};

    if (frontmatter.storyLead === false) {
      return;
    }

    const children = tree.children;
    if (!Array.isArray(children) || children.length === 0) {
      return;
    }

    let firstHeadingIndex = -1;
    for (let i = 0; i < children.length; i += 1) {
      const node = children[i];
      if (node?.type === "element" && (node.tagName === "h2" || node.tagName === "h1")) {
        firstHeadingIndex = i;
        break;
      }
    }

    // No section heading, or nothing before it — leave as normal prose
    if (firstHeadingIndex <= 0) {
      return;
    }

    const lead = children.slice(0, firstHeadingIndex);
    const hasContent = lead.some((node) => {
      if (node.type === "element") return true;
      if (node.type === "text" && node.value?.trim()) return true;
      return false;
    });

    if (!hasContent) {
      return;
    }

    const wrapper = {
      type: "element",
      tagName: "div",
      properties: {
        className: ["article-story"],
        "data-article-story": ""
      },
      children: lead
    };

    tree.children = [wrapper, ...children.slice(firstHeadingIndex)];
  };
}
