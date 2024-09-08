"use client";
import { useState } from "react";
import AsideItem from "./AsideItem";
import { MenuTreeRoot } from "@/lib/types";

interface AsideProps {
  menuTree: MenuTreeRoot;
  title?: string;
}

export default function Aside({ menuTree, title = "Articles" }: AsideProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={`flex flex-col w-52 h-[80vh] pl-10 scrollbar-hide hidden sm:flex`}
    >
      <div className="text-2xl">{title}</div>
      <div className="mt-8 flex flex-col">
        {menuTree?.map((t) => (
          <AsideItem key={t.title} item={t} />
        ))}
      </div>
    </div>
  );
}
