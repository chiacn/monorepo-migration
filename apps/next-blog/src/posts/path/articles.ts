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

  {
    slug: ["JavaScript", "Event Loop의 이해.mdx"],
  },
  {
    slug: ["CS", "CORS의 이해.mdx"],
  },

  // ----------------------------------------------------

  // BLOG ----------------------------------------------
  { slug: ["회고"] },
  {
    slug: ["회고", "Event Loop의 이해.mdx"],
  },
  // ----------------------------------------------------
];
