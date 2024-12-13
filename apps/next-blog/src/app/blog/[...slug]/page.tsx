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

  // return articlesPath.map((item) => ({
  //   slug: item.slug.map((el) => encodeURIComponent(el)),
  // }));

  /*
    * Note:
    - 왜 그런진 모르겠는데 로컬 환경에서는 item.slug.map((el) => encodeURIComponent(el))으로 articles에 정의한 경로에 대해 인코딩을 해주어야 됐음.
    - 그런데 github pages에 정적 페이지로 배포 시, generateStaticParams에서 인코딩을 해줄 필요가 없음. (오히려 인코딩 해주면 오류나는 현상.)
      => 오히려 인코딩을 안 하고, function Page에서 slug로 받을 때도 decoding을 해줘서 mdx 파일명을 decoded name으로 맞춰주면 작동하는듯.
   */

  // return articlesPath.map((item) => ({
  //   slug: item.slug.map((el) => encodeURIComponent(el)),
  // }));
  return articlesPath;
}

interface PageProps {
  params: { slug: string[] };
}

export default function Page({ params }: PageProps) {
  const { slug } = params;
  // const listPath = path.join(...slug);
  // const listPath = path.join(
  //   ...slug.map((el) => encodeURIComponent(decodeURIComponent(el))),
  // );
  const listPath = path.join(...slug.map((el) => decodeURIComponent(el)));
  console.log("page.tsx ---- listPath ======================", listPath);
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
