import ContainerForDiagram from "@/components/flow/ContainerForDiagram";
import DiagramContainer from "@/components/flow/DiagramContainer";
import FlowDiagramButton from "@/components/flow/FlowDialogButton";
import { getArticle } from "@/utils/postUtils";
import { MDXRemote } from "next-mdx-remote/rsc";
import path from "path";

interface ArticleLayoutProps {
  articlePath: string;
}
export default async function ArticleLayout({
  articlePath,
}: ArticleLayoutProps) {
  const { markdownSource } = await getArticle(articlePath);

  // const title = articlePath.split(path.sep).pop();
  // const decodedTitle = decodeURIComponent(title as string).replace(".mdx", "");

  console.log("markdownSource:", markdownSource);

  /*
    <ContainerForDiagram>
      여기에 MDXRemote 컴포넌트가 각각 들어가게??
    </ContainerForDiagram>
  */
  return (
    <div className="prose relative">
      <FlowDiagramButton />
      {/* <h1>{decodedTitle}</h1> */}
      <MDXRemote
        source={markdownSource}
        options={{
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [],

            rehypePlugins: [],
          },
        }}
        components={{ ContainerForDiagram }}
      />
    </div>
  );
}
