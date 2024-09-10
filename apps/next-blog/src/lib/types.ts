export type MenuTreeNode = {
    title: string;
    urlPath: string;
    children?: MenuTreeNode[];
    isDirectory?: boolean;
}

export type articlesList = {
    title: string;
    urlPath: string;
}