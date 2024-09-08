import Aside from "./aside/Aside";
import NavigationBar from "./navbar/NavigationBar";

interface ArticleContainerProps {
  children: React.ReactNode;
}

export default function CommonContainer({ children }: ArticleContainerProps) {
  const mockMenuTree = [
    {
      title: "JavaScript",
      urlPath: "/javascript",
      children: ["Introduction", "Advanced Concepts", "ES6 Features"],
    },
    {
      title: "React",
      urlPath: "/react",
      children: ["Hooks", "State Management", "Component Patterns"],
    },
    {
      title: "CSS",
      urlPath: "/css",
      children: ["Flexbox", "Grid", "Animations"],
    },
    {
      title: "Node.js",
      urlPath: "/node",
      children: ["Introduction", "Express", "REST API"],
    },
    {
      title: "No Children Example",
      urlPath: "/no-children",
      children: [],
    },
  ];

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row">
        <Aside menuTree={mockMenuTree} />
        <div>{children}</div>
      </div>
    </>
  );
}
