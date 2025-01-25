import ContainerForDiagram from "@/components/flow/ContainerForDiagram";
import DiagramContainer from "@/components/flow/DiagramContainer";
import FlowDiagramButton from "@/components/flow/FlowDialogButton";
import { getArticle } from "@/utils/postUtils";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrismPlus from "rehype-prism-plus"; // 추가
import "prism-themes/themes/prism-one-dark.css"; // Prism 테마 추가
import path from "path";

interface ArticleLayoutProps {
  articlePath: string;
}
export default async function ArticleLayout({
  articlePath,
}: ArticleLayoutProps) {
  const { markdownSource } = await getArticle(articlePath);

  return (
    <div className="prose relative w-4/5 md:w-full">
      <FlowDiagramButton />
      <MDXRemote
        source={markdownSource}
        options={{
          parseFrontmatter: true,
          mdxOptions: {
            rehypePlugins: [rehypePrismPlus], // rehype-prism-plus 추가
          },
        }}
        components={{ ContainerForDiagram }} // MDX에서 커스텀 컴포넌트로 사용
      />
    </div>
  );
}
