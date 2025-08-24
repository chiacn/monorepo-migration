import { ArticlesList, MenuTreeNode, Frontmatter } from "@/lib/types";
import { compileMDX } from "next-mdx-remote/rsc";

const fs = require("fs");
const path = require("path");

interface AllArticlesList {
  title: string;
  urlPath: string;
  frontmatter: Frontmatter;
}

export const getAllArticlesList = async (
  listPath: string,
): Promise<AllArticlesList[]> => {
  try {
    const basePath = path.join(process.cwd(), "src", "posts", listPath);

    // console.log("listPath --- ", listPath);

    /**
     * 재귀적으로 디렉토리 하위의 모든 .mdx 파일 경로를 배열로 반환하는 함수
     */
    const getAllMdxFiles = (dirPath: string): string[] => {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      let fileList: string[] = [];

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
          fileList = fileList.concat(getAllMdxFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
          fileList.push(fullPath);
        }
      }

      return fileList;
    };

    // 모든 mdx 파일 경로들
    const allFiles = getAllMdxFiles(basePath);

    // 모든 파일을 async로 처리
    const mdxList = await Promise.all(
      allFiles.map(async (filePath: string) => {
        const markdownSource = fs.readFileSync(filePath, "utf-8");
        const { frontmatter } = await compileMDX({
          source: markdownSource,
          options: {
            parseFrontmatter: true,
            mdxOptions: {
              remarkPlugins: [],
              rehypePlugins: [],
            },
          },
        });

        // urlPath를 만들기 위해 src/posts 이후의 상대 경로를 구한다
        const relativePath = path.relative(
          path.join(process.cwd(), "src", "posts"),
          filePath,
        );

        // 최종 URL 경로 (예: /articles/subfolder/fileName)
        const urlPath = "/" + relativePath;

        return {
          title: path.basename(filePath, ".mdx"),
          urlPath,
          frontmatter,
        };
      }),
    );

    // 날짜 기준 정렬(내림차순)
    return mdxList.sort(
      (a: any, b: any) =>
        Number(new Date(b.frontmatter.date)) -
        Number(new Date(a.frontmatter.date)),
    ) as any; // TODO: 추후 any 타입 제거
  } catch (error) {
    console.error("getAllArticlesList error --- ", error);
    return [];
  }
};

export const getArticlesList = async (
  listPath: string,
): Promise<ArticlesList[]> => {
  try {
    const directoryPath = path.join(process.cwd(), "src", "posts", listPath);

    const fileList = fs.readdirSync(directoryPath); // 해당 경로의 하위 파일 배열로 반환

    const mdxList = await Promise.all(
      fileList.map(async (fileName: string) => {
        const mdxPath = path.join(directoryPath, fileName);
        const markdownSource = fs.readFileSync(mdxPath, "utf-8");

        const { frontmatter } = await compileMDX({
          source: markdownSource,
          options: {
            parseFrontmatter: true,
            mdxOptions: {
              remarkPlugins: [],
              rehypePlugins: [],
            },
          },
        });
        return {
          title: fileName.replace(".mdx", ""),
          urlPath: "/" + listPath + "/" + fileName,
          frontmatter: frontmatter,
        };
      }),
    );

    return mdxList.sort(
      (a: any, b: any) =>
        Number(new Date(b.frontmatter.date)) -
        Number(new Date(a.frontmatter.date)),
    );
  } catch (error) {
    console.error("getArticlesList error --- ", error);
    return [];
  }
};

export const getArticle = async (articlePath: string) => {
  try {
    const targetPath = path.join(process.cwd(), "src", "posts", articlePath);

    console.log("getArticles ---- targetPath ---- ", targetPath);

    const decodedPath = decodeURIComponent(targetPath);
    const markdownSource = fs.readFileSync(decodedPath, "utf-8");

    // Note: 외부에서 MDX에 접근해서 content, frontmatter 추출하는 경우 compileMDX 사용
    const { content, frontmatter } = await compileMDX({
      source: markdownSource,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
      },
    });

    /* Note: MDXRemote만 사용하는 경우 
            <MDXRemote source={markdownsource} ...  /> 이렇게 사용.
      */
    return { markdownSource, content, frontmatter };
  } catch (error) {
    console.error("getArticle error --- ", error);
    return { markdownSource: "", content: "", frontmatter: {} };
  }
};

// 파일 및 디렉토리 구조를 탐색하여 객체로 반환하는 함수
export const getDirectoryStructure = (
  dirPath: string,
): MenuTreeNode[] | undefined => {
  try {
    const baseUrl = path.join("posts");
    /*
        구조 예시 -
          ./src/posts
                  articles
                  test
        ex. dirPath = './src/posts'
        fs.readdirSync(dirPath) -> ['articles', 'test'] (해당 경로의 하위 directory/file 배열로 반환)
    */

    const menuList = fs
      .readdirSync(dirPath) // fs.readdirSync - 해당 경로 '하위'의 directory 배열로 반환.
      .map((item: string) => {
        const itemPath = path.join(dirPath, item);
        const itemStat = fs.statSync(itemPath);
        return {
          title: path.basename(itemPath),
          urlPath: itemPath.substring(
            itemPath.indexOf(baseUrl) + baseUrl.length,
          ), // baseUrl 이후의 경로만 반환
          children: itemStat.isDirectory()
            ? getDirectoryStructure(itemPath)
            : [],
          isDirectory: itemStat.isDirectory(),
        };
      })
      .filter((item: MenuTreeNode) => item.isDirectory); //디렉토리만 출력

    // console.log('menuList --- ', JSON.stringify(menuList, null, 2));

    return menuList;
  } catch (error) {
    console.error("getDirectoryStructure error --- ", error);
    return [];
  }
};
