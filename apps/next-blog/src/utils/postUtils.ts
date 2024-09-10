import { MenuTreeNode } from "@/lib/types";

const fs = require('fs');
const path = require('path');




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
