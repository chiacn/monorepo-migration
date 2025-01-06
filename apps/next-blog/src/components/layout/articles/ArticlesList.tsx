import ArticlesListItem from "./ArticlesListItem";
import { getAllArticlesList, getArticlesList } from "@/utils/postUtils";
import ArticlesListItemWithTransition from "./ArticlesListItemWithTransition";

interface ArticlesListProps {
  menuTitle: string;
  listPath: string;
  isAllPosts?: boolean;
}

// 서버 컴포넌트
export default async function ArticlesList({
  menuTitle,
  listPath,
  isAllPosts = false,
}: ArticlesListProps) {
  const articlesList = isAllPosts
    ? await getAllArticlesList(listPath)
    : await getArticlesList(listPath);

  console.log("menuTitle ------------------ ", menuTitle);
  console.log("listPath ------------------ ", listPath);

  return (
    <div className="w-full p-4">
      {/* 제목 영역 */}
      <div className="flex font-bold sm:flex-row sm:w-3/5 p-4 text-lg sm:text-3xl">
        <div className="ml-0">{decodeURIComponent(menuTitle)}</div>
      </div>

      {/* 설명 영역 TODO: 추후 추가 */}
      {/* <div className="flex w-full sm:w-4/5 h-full p-4 mt-4">
        
      </div> */}

      {/* 리스트 영역 */}
      <ArticlesListItemWithTransition>
        <ul className="mt-4">
          {articlesList.length > 0 ? (
            articlesList.map((article) => (
              <ArticlesListItem
                key={article.urlPath}
                urlPath={article.urlPath}
                title={article.title}
                frontmatter={article.frontmatter}
              />
            ))
          ) : (
            <li className="text-center text-gray-500 mt-4">
              {listPath === "blog"
                ? "회고 및 일상 글 업로드 예정"
                : "아직 게시물이 없습니다.. (😅)"}
            </li>
          )}
        </ul>
      </ArticlesListItemWithTransition>
    </div>
  );
}
