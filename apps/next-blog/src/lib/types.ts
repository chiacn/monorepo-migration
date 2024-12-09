export type MenuTreeNode = {
  title: string;
  urlPath: string;
  children?: MenuTreeNode[];
  isDirectory?: boolean;
};

export type ArticlesList = {
  title: string;
  urlPath: string;
  frontmatter: Frontmatter;
};

export type Frontmatter = {
  title: string;
  date: string;
  description?: string;
  thumbnail?: string;
};

export type Structures = {
  tree: TreeType;
  example: ExampleType;
  logicalProgression: LogicalProgressionType;
  [key: string]: any;
};

type TreeType = {
  displayType: string;
  content: {
    element_name: string;
    related_elements: {
      element_name: string;
      relationTypeWithParent: string;
      relationship?: string;
      description: string;
    }[];
    description: string;
  }[];
};

type ExampleType = {
  target: string;
  example: string;
  steps: {
    step: number;
    target: string;
    example: string;
    description: string;
    result: object;
    steps: {
      step: number;
      target: string;
      example: string;
      description: string;
      result: object;
      steps: any[];
    }[];
  }[];
};

type LogicalProgressionType = {
  title: string;
  steps: {
    step: number;
    target: string;
    statement: string;
    description: string;
    implications: string;
    steps?: {
      step: number;
      statement: string;
      description: string;
      implications: string;
    }[];
  }[];
  conclusion: string;
};

export type DiagramItem = {
  diagramId: string | number;
  step: string | number;
  parentDiagramId?: string | number | undefined;
  target: string;
  example: string;
  description: string;
  result?: { answer: any[] };
  steps?: DiagramItem[];
};
