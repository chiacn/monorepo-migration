import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import navlinks from "@/data/navlink";

import React, { useState } from "react";

interface NavigationBarProps {
  hoverActiveMode: boolean;
}
export default function NavigationBar({
  hoverActiveMode = true,
}: NavigationBarProps) {
  return (
    <div>
      <NavigationMenu className="h-20 p-8">
        <NavigationMenuList>
          <>
            {navlinks.map((navlink) => (
              <NavigationMenuItem key={navlink.title}>
                <NavigationMenuTrigger
                  showArrowButton={false}
                  className="text-base"
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
            <div className="absolute bottom-0 left-0 bg-black h-[2px] transition-[width,left,right] duration-[0.3s,0.3s,0.3s] ease"></div>
          </>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
