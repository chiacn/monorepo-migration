"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import navlinks from "@/data/navlink";

import React, { useEffect, useMemo, useRef, useState } from "react";
import useNavigationHighlight from "../hooks/useNavigationHighlight";

interface NavigationBarProps {
  hoverActiveMode?: boolean;
}
export default function NavigationBar({
  hoverActiveMode = true,
}: NavigationBarProps) {
  const tabGap = 40;
  const { navigationMenuListRef, currentBarStyle, setHoverTabIdx } =
    useNavigationHighlight(tabGap);

  return (
    <div>
      <NavigationMenu className="h-20 p-8">
        <NavigationMenuList ref={navigationMenuListRef} style={{ gap: tabGap }}>
          <>
            {navlinks.map((navlink) => (
              <NavigationMenuItem key={navlink.title}>
                <NavigationMenuTrigger
                  className="text-base"
                  showArrowButton={false}
                  onMouseOver={
                    hoverActiveMode
                      ? () => setHoverTabIdx(navlink.idx)
                      : undefined
                  }
                >
                  {navlink.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink href={navlink.link}>
                    {/* {navlink.title} */}
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            {/* Current Line Tab Highlight */}
            <div
              className="absolute bottom-0 left-0 bg-black h-[2px] transition-[width,left,right] duration-[0.3s,0.3s,0.3s] ease"
              style={{ ...currentBarStyle }}
            ></div>
          </>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
