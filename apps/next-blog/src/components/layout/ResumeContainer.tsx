import Aside from "./aside/Aside";
import { getDirectoryStructure } from "@/utils/postUtils";

interface ResumeContainerProps {
  children: React.ReactNode;
}

export default async function ResumeContainer({
  children,
}: ResumeContainerProps) {
  return (
    <>
      <div className="w-full flex flex-col sm:flex-row">
        <div className="w-full sm:px-8 flex flex-col items-center">
          {children}
        </div>
      </div>
    </>
  );
}
