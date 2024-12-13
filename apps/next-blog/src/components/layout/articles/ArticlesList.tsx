import ArticlesListItem from "./ArticlesListItem";
import { getArticlesList } from "@/utils/postUtils";
import ArticlesListItemWithTransition from "./ArticlesListItemWithTransition";

interface ArticlesListProps {
  menuTitle: string;
  listPath: string;
}

// 서버 컴포넌트
export default async function ArticlesList({
  menuTitle,
  listPath,
}: ArticlesListProps) {
  const articlesList = await getArticlesList(listPath);
  console.log("ArticlesList ------------ listPath --- ", listPath);
  console.log("ArticlesList - articlesList ------------------- ", articlesList);

  // TODO: 여기서 디코딩해서 보내주는건 어떨까? 어차피 이 정보가 page.tsx로 전달될 거니까?

  return (
    <div className="w-full p-4">
      {/* 제목 영역 */}
      <div className="flex font-bold sm:flex-row sm:w-3/5 p-4 text-lg sm:text-3xl">
        <div className="ml-0">{menuTitle}</div>
      </div>

      {/* 설명 영역 TODO: 추후 추가 */}
      {/* <div className="flex w-full sm:w-4/5 h-full p-4 mt-4">
        
      </div> */}

      {/* 리스트 영역 */}
      <ArticlesListItemWithTransition>
        <ul className="mt-4">
          {articlesList.length > 0 &&
            articlesList.map((article) => (
              <ArticlesListItem
                key={article.urlPath}
                urlPath={article.urlPath}
                title={article.title}
                frontmatter={article.frontmatter}
              />
            ))}
        </ul>
      </ArticlesListItemWithTransition>
    </div>
  );
}
