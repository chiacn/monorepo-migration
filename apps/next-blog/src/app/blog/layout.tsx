import BlogContainer from "@/components/layout/BlogContainer";

export default function BlogLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <BlogContainer>{children}</BlogContainer>;
}
