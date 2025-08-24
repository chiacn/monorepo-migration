import Aside from "./aside/Aside";
import { getDirectoryStructure } from "@/utils/postUtils";

interface BlogContainerProps {
  children: React.ReactNode;
}

export default async function BlogContainer({ children }: BlogContainerProps) {
  const menuTree = getDirectoryStructure("./src/posts/blog");
  // console.log("mdxList --- ", JSON.stringify(menuTree, null, 2));

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row">
        <Aside menuTree={menuTree} />
        <div className="w-full sm:px-8 flex flex-col items-center">
          {children}
        </div>
      </div>
    </>
  );
}
