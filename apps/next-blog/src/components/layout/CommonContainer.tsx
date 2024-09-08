"use client";
import NavigationBar from "./navbar/NavigationBar";
import MobileNavigationBar from "./navbar/MobileNavigationBar";
import useIsMobile from "./hooks/useIsMobile";

interface ContainerProps {
  children: React.ReactNode;
}

export default function CommonContainer({ children }: ContainerProps) {
  const isMobile = useIsMobile({ maxWidth: 640 });
  if (isMobile === null) {
    return null; // Note: 모바일 여부 판단이 안 되었을 시 표시 x
  }
  return (
    <>
      {isMobile ? <MobileNavigationBar /> : <NavigationBar />}
      <div className="flex min-h-screen flex-col items-center justify-between">
        {children}
      </div>
    </>
  );
}
