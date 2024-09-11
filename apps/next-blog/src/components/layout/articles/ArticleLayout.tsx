import { getArticle } from "@/utils/postUtils";
import { MDXRemote } from "next-mdx-remote/rsc";

interface ArticleLayoutProps {
  articlePath: string;
}
export default async function ArticleLayout({
  articlePath,
}: ArticleLayoutProps) {
  const { markdownSource } = await getArticle(articlePath);

  return (
    <div>
      <h1>ArticleLayout</h1>
      <MDXRemote
        source={markdownSource}
        options={{
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
          },
        }}
      />
    </div>
  );
}
