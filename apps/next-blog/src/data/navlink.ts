/**
 * Note: 메뉴 추가 시 - src/app 하위에 해당 폴더 있어야함.
 * ex) BLOG - src/app/blog
 */

const navlinks: { idx: number; title: string; link: string }[] = [
  // { idx: 0, title: "Home", link: "/" },
  { idx: 0, title: "BLOG", link: "/blog" },
  { idx: 1, title: "ARTICLES", link: "/articles" },
  { idx: 2, title: "PROJECTS", link: "/projects" },
  { idx: 3, title: "RESUME", link: "/resume" },
];

export default navlinks;
