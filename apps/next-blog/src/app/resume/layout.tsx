import ResumeContainer from "@/components/layout/ResumeContainer";

export default function BlogLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <ResumeContainer>{children}</ResumeContainer>;
}
