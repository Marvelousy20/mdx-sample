import { MDXRemote } from "next-mdx-remote";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import Layout from "../Layout";
import components from "../mdx-components";

export default function Page({ mdx, frontmatter }) {
  const Components = useMemo(() => getMDXComponent(mdx), [mdx]);

  return (
    <Layout frontmatter={frontmatter} layout={frontmatter.layout}>
      {/* <MDXRemote {...mdx} components={components} /> */}

      <Components {...mdx} components={components} />
    </Layout>
  );
}
