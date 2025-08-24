import Aside from "./aside/Aside";
import { getDirectoryStructure } from "@/utils/postUtils";

interface ProjectContainer {
  children: React.ReactNode;
}

export default async function ProjectContainer({ children }: ProjectContainer) {
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
