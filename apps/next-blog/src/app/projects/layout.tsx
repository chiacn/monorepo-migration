import ArticleContainer from "@/components/layout/ArticleContainer";
import ProjectContainer from "@/components/layout/ProjectContainer";

export default function BlogLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <ProjectContainer>{children}</ProjectContainer>;
}
