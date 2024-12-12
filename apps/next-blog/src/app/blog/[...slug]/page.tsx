import path from "path";
import ArticlesList from "@/components/layout/articles/ArticlesList";
import ArticleLayout from "@/components/layout/articles/ArticleLayout";
import { articlesPath } from "@/posts/path/articles";

/* Note: dynamicParams - 
    true : generateStaticParams에 없는 경로라도 필요에 따라 생성
    false : 포함 안 된 경로 404
 */
export const dynamicParams = true;
export async function generateStaticParams() {
  // return [{ slug: ["articles", "Argorithm", "Test"] }];
  // Note: github pages 배포에 따라, generateStaticParams로 정적 경로 지정해주어야함.

  return articlesPath.map((item) => ({
    slug: item.slug.map((el) => encodeURIComponent(el)),
  }));
}

interface PageProps {
  params: { slug: string[] };
}

export default function Page({ params }: PageProps) {
  const { slug } = params;
  console.log("page.tsx - slug---", slug);

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
