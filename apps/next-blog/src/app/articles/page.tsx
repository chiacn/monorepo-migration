import ArticlesList from "@/components/layout/articles/ArticlesList";

import React from "react";

export default function Page() {
  const path = "articles";
  return <ArticlesList menuTitle={""} listPath={path} isAllPosts={true} />;
}
