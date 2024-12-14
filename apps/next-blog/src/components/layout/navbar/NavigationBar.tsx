"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import navlinks from "@/data/navlink";
import React from "react";
import useNavigationHighlight from "../hooks/useNavigationHighlight";
import Link from "next/link";

interface NavigationBarProps {
  hoverActiveMode?: boolean;
}
export default function NavigationBar({
  hoverActiveMode = true,
}: NavigationBarProps) {
  const tabGap = 40;
  const {
    navigationMenuListRef,
    currentBarStyle,
    setHoverTabIdx,
    setSelectedTabIdx,
  } = useNavigationHighlight(tabGap);

  return (
    <div className="flex justify-center">
      <NavigationMenu className="h-20 p-8">
        <NavigationMenuList>
          <div
            className="flex relative" // relative 추가
            style={{ gap: tabGap }}
            ref={navigationMenuListRef}
            onMouseLeave={() => setHoverTabIdx(null)} // 마우스 떠나면 hover 해제
          >
            {navlinks.map((navlink) => (
              <NavigationMenuItem
                key={navlink.title}
                onMouseOver={
                  hoverActiveMode
                    ? () => setHoverTabIdx(navlink.idx)
                    : undefined
                }
                onClick={() => {
                  setSelectedTabIdx(navlink.idx);
                  setHoverTabIdx(null); // 클릭 시 hover 상태 해제
                }}
              >
                <Link href={navlink.link} passHref>
                  <NavigationMenuTrigger
                    className="text-base"
                    showArrowButton={false}
                  >
                    {navlink.title}
                  </NavigationMenuTrigger>
                </Link>
              </NavigationMenuItem>
            ))}
            {/* Current Line Tab Highlight */}
            <div
              className="absolute bottom-0 left-0 bg-black h-[2px] transition-[width,left,right] duration-[0.3s,0.3s,0.3s] ease"
              style={{ ...currentBarStyle }}
            ></div>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
