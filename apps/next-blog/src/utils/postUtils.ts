import { ArticlesList, MenuTreeNode } from "@/lib/types";
import { compileMDX } from "next-mdx-remote/rsc";

const fs = require('fs');
const path = require('path');

export const getArticlesList = async (listPath: string): Promise<ArticlesList[]> => {
  const directoryPath = path.join(
    process.cwd(),
    "src",
    listPath,
  );
  const fileList = fs.readdirSync(directoryPath); // 해당 경로의 하위 파일 배열로 반환

  const mdxList = await Promise.all(fileList.map(async (fileName: string) => {
    const mdxPath = path.join(directoryPath, fileName);
    const markdownSource = fs.readFileSync(mdxPath, "utf-8");

    const { frontmatter } = await compileMDX({
      source: markdownSource,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: []
        }
      }
    });
    return {
      title: fileName.replace('.mdx', ''),
      urlPath: listPath + '/' + fileName,
      frontmatter: frontmatter,
    };
  }));
  return mdxList
    .sort((a: any, b: any) =>  Number(new Date(b.frontmatter.date)) - Number(new Date(a.frontmatter.date)));
}


// 파일 및 디렉토리 구조를 탐색하여 객체로 반환하는 함수
export const getDirectoryStructure = (dirPath: string): MenuTreeNode[] | undefined =>  {
  const baseUrl = path.join('posts');
  /*
      구조 예시 -
        ./src/posts
                articles
                test
      ex. dirPath = './src/posts'
      fs.readdirSync(dirPath) -> ['articles', 'test'] (해당 경로의 하위 directory/file 배열로 반환)
  */

  const menuList = fs.readdirSync(dirPath) // fs.readdirSync - 해당 경로 '하위'의 directory 배열로 반환.
    .map((item: string) => {
      const itemPath = path.join(dirPath, item);
      const itemStat = fs.statSync(itemPath);
      return {
        title: path.basename(itemPath),
        urlPath: '/blog' + itemPath.substring(itemPath.indexOf(baseUrl) + baseUrl.length), // baseUrl 이후의 경로만 반환
        children:(itemStat.isDirectory()) ? getDirectoryStructure(itemPath) : [],
        isDirectory: itemStat.isDirectory(),
      };
      
    }).filter((item: MenuTreeNode) => item.isDirectory); //디렉토리만 출력
    
    // console.log('menuList --- ', JSON.stringify(menuList, null, 2));

  return menuList;

}
