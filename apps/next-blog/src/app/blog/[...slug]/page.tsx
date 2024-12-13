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
    1. page.tsx에서 ArticlesList로 진입할 때 인코딩 된 listPath가 전달되고, 
    2. ArticlesList에서 다시 page.tsx로 재진입할 때 이중으로 인코딩되는듯..?
      
   */

  console.log(
    `
    =====================================================================
    page.tsx  ------------------ [generateStaticParams] -----------------
    =====================================================================

    `,
    articlesPath.map((item) => ({
      slug: item.slug.map((el) => encodeURIComponent(el)),
    })),
  );
  return articlesPath.map((item) => ({
    slug: item.slug.map((el) => encodeURIComponent(el)),
  }));
}

interface PageProps {
  params: { slug: string[] };
}

export default function Page({ params }: PageProps) {
  const { slug } = params;

  // TODO: 여기서 slug가 이중 인코딩 되는게 문제
  // => 여기서 그냥 path.join(...slug)를 해주면 slug가 인코딩된 상태로 들어온다??
  // => console 찍어보면 여기서 이중으로 인코딩된 slug가 들어온다.

  // * 그냥 아예 여기서 decode로 통일시킬까?
  console.log(
    `
    ============================================================
    page.tsx - function Page - [slug]---------------------------
    ============================================================
      
    `,
    slug,
  );

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
