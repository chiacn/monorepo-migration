import { getArticle } from "@/utils/postUtils";

interface ArticleLayoutProps {
  articlePath: string;
}
export default async function ArticleLayout({
  articlePath,
}: ArticleLayoutProps) {
  const { content, frontmatter } = await getArticle(articlePath);

  return (
    <div>
      <h1>ArticleLayout</h1>
    </div>
  );
}
