export type MenuTreeNode = {
    title: string;
    urlPath: string;
    children?: MenuTreeNode[];
    isDirectory?: boolean;
}

export type ArticlesList = {
    title: string;
    urlPath: string;
    frontmatter: object;
}