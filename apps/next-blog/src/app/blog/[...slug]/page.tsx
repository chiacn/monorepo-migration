import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import ArticlesList from "@/components/layout/articles/ArticlesList";
import { getArticlesList } from "@/utils/postUtils";

interface PageProps {
  params: { slug: string[] };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  const listPath = path.join("posts", ...slug);
  const articlesList = await getArticlesList(listPath);

  const menuTitle = slug[slug.length - 1];
  const isPost = menuTitle.includes(".mdx");
  return (
    // <>{isPost ? <ArticleLayout /> : <ArticlesList menuTitle={menuTitle} />}</>
    <ArticlesList menuTitle={menuTitle} articlesList={articlesList} />
  );
}
