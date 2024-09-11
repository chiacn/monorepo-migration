import path from "path";
import ArticlesList from "@/components/layout/articles/ArticlesList";
import ArticleLayout from "@/components/layout/articles/ArticleLayout";

interface PageProps {
  params: { slug: string[] };
}

export default function Page({ params }: PageProps) {
  const { slug } = params;

  const listPath = path.join(...slug);
  const menuTitle = slug[slug.length - 1];
  const isPost = menuTitle.includes(".mdx");

  return (
    <>
      {isPost ? (
        <ArticleLayout articlePath={listPath} />
      ) : (
        <ArticlesList menuTitle={menuTitle} listPath={listPath} />
      )}
    </>
  );
}
