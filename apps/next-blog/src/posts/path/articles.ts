export const articlesPath = [
  /*
    ex)
    articles > JavaScript > Event Loop의 이해.mdx

    [articles, JavaScript, Event Loop의 이해.mdx] --------- x
    [JavaScript, Event Loop의 이해.mdx] ------------------- o
  */

  // directory -----------------------------------------

  // Articles ------------------------------------------
  // { slug: ["CS"] },
  // { slug: ["JavaScript"] },
  { slug: ["Articles"] },
  { slug: ["Front"] },
  { slug: ["트러블슈팅"] },

  {
    slug: ["Articles", "Event Loop의 이해.mdx"],
  },
  {
    slug: ["Articles", "CORS의 이해.mdx"],
  },
  {
    slug: ["Front", "WebView의 Service Worker 사용 방식에 대해 알아보기.mdx"],
  },
  {
    slug: [
      "트러블슈팅",
      "(Nuxt3) ts 파일에서 useRuntimeConfig로 환경변수를 못 가져오는 이유.mdx",
    ],
  },
  {
    slug: [
      "트러블슈팅",
      "(Nuxt3) SSR 환경에서 새로고침 시 getActivePinia() was called but there was no active Pinia 오류.mdx",
    ],
  },
  // ----------------------------------------------------

  // BLOG ----------------------------------------------
  { slug: ["회고"] },
  {
    slug: ["회고", "Event Loop의 이해.mdx"],
  },
  // ----------------------------------------------------
];
