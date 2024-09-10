import { ArticlesList as ArticlesListType } from "@/lib/types";

import Link from "next/link";
import ArticlesListItem from "./ArticlesListItem";

interface ArticlesListProps {
  articlesList: ArticlesListType[];
  menuTitle: string;
}

// 서버 컴포넌트
export default function ArticlesList({
  articlesList,
  menuTitle,
}: ArticlesListProps) {
  // TODO: 썸네일 추가
  // const description = getArticleListDescription(menuTitle);

  return (
    <div className="w-full p-4">
      {/* 제목 영역 */}
      <div className="flex flex-col sm:flex-row sm:w-3/5 p-4 text-lg sm:text-xl">
        <div className="ml-0 sm:ml-8">{menuTitle}</div>
      </div>

      {/* 설명 영역 */}
      <div className="flex w-full sm:w-4/5 h-full border border-black p-4 mt-4">
        {/* {description} */}
      </div>

      {/* 리스트 영역 */}
      <ul className="mt-4">
        {articlesList.length > 0 &&
          articlesList.map((article) => (
            <ArticlesListItem
              key={article.urlPath}
              urlPath={article.urlPath}
              title={article.title}
            />
          ))}
      </ul>
    </div>
  );
}
