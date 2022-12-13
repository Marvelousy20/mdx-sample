import matter from "gray-matter";

import path from "path";
import fs from "fs";
// import { serialize } from "next-mdx-remote/serialize";
import rehypeSlugger from "rehype-slug";
import rehypePrism from "rehype-prism-plus";
import remarkMdxToc from "remark-mdx-toc";
import remarkEndWithCodeBlock from "remark-end-with-code-block";
import remarkGfm from "remark-gfm";

import { pageFilePaths, PAGES_PATH } from "../utils/mdxUtils";

// Mdx-bundle
import { bundleMDX } from "mdx-bundler";

import Page from "../components/Page";

export default Page;

export async function getStaticProps({ params: { slug } }) {
  const postFilePath = path.join(PAGES_PATH, `${slug.join("/")}.mdx`);
  const source = fs.readFileSync(postFilePath, "utf8");

  const { content, data } = matter(source);

  if (!postFilePath) {
    console.warn("No MDX file found for slug");
  }

  // I could read the frontmatter and use it to decide if
  // remarkMdxToc should be included. I should probably
  // do this at some point.
  // const mdxSource = await serialize(content, {
  //   mdxOptions: {
  //     remarkPlugins: [() => remarkEndWithCodeBlock(source), remarkMdxToc],
  //     rehypePlugins: [
  //       rehypeSlugger,
  //       [
  //         rehypePrism,
  //         {
  //           showLineNumbers: false,
  //         },
  //       ],
  //     ],
  //   },
  // });

  const { code } = await bundleMDX({
    source: content,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkMdxToc,
        () => remarkEndWithCodeBlock(source),
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlugger,
        [rehypePrism, { showLineNumbers: false }],
      ];
      return options;
    },
  });

  return {
    props: {
      mdx: code,
      frontmatter: data,
    },
  };
}

export async function getStaticPaths() {
  const paths = pageFilePaths.map((slug) => ({
    params: { slug: slug.split("/") },
  }));

  return {
    paths,
    fallback: false,
  };
}
