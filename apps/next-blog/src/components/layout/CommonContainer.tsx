"use client";
import NavigationBar from "./navbar/NavigationBar";
import MobileNavigationBar from "./navbar/MobileNavigationBar";
import useIsMobile from "./hooks/useIsMobile";
import { useRef, useEffect, useState, useCallback } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export default function CommonContainer({ children }: ContainerProps) {
  const isMobile = useIsMobile({ maxWidth: 640 });

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidthClass, setContainerWidthClass] = useState<string>("");

  // useCallback을 사용하여 함수 메모이제이션
  const calculateContainerWidth = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      const padding = Math.floor(Math.abs(width - 900) / 2);
      return `${padding}px`;
      // return "sm:px-[240px]";
    }
    return "";
  }, []);

  useEffect(() => {
    if (isMobile !== null && containerRef.current) {
      setContainerWidthClass(calculateContainerWidth());
    }

    const handleResize = () => {
      setContainerWidthClass(calculateContainerWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateContainerWidth, isMobile]);

  if (isMobile === null) {
    return <div></div>;
  }

  return (
    <div
      ref={containerRef}
      className="sm:max-w-screen sm:mx-auto"
      style={{
        paddingLeft: containerWidthClass,
        paddingRight: containerWidthClass,
      }}
    >
      {isMobile ? <MobileNavigationBar /> : <NavigationBar />}
      <div className="flex min-h-screen flex-col items-center justify-between sm:mt-12">
        {children}
      </div>
    </div>
  );
}
