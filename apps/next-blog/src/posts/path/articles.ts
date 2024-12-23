export const articlesPath = [
  /*
    ex)
    articles > JavaScript > Event Loop의 이해.mdx

    [articles, JavaScript, Event Loop의 이해.mdx] --------- x
    [JavaScript, Event Loop의 이해.mdx] ------------------- o
  */

  // directory -----------------------------------------

  // Articles ------------------------------------------
  { slug: ["JavaScript"] },
  { slug: ["Front"] },
  { slug: ["CS"] },
  { slug: ["트러블슈팅"] },

  {
    slug: ["JavaScript", "Event Loop의 이해.mdx"],
  },
  {
    slug: [
      "Front",
      "(Nuxt3) ts 파일에서 useRuntimeConfig로 환경변수를 못 가져오는 이유.mdx",
    ],
  },
  {
    slug: ["CS", "CORS의 이해.mdx"],
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
