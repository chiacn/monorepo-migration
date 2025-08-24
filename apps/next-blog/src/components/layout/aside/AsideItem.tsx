import { useState } from "react";
import Link from "next/link";
import { MenuTreeNode } from "@/lib/types";

export default function AsideItem({ item }: { item: MenuTreeNode }) {
  const [isItemsOpen, setIsItemsOpen] = useState(
    item.children && item.children?.length > 0,
  );

  const baseClassName =
    "block cursor-pointer px-2 py-1 transition-colors duration-200";
  const parentClassName =
    "text-lg font-medium text-gray-700 hover:text-gray-900";
  const childClassName = "text-base text-gray-600 hover:text-gray-900";

  return (
    <div key={item.title}>
      {item.children && item.children.length > 0 ? (
        <div
          className={`${baseClassName} ${parentClassName}`}
          onClick={() => setIsItemsOpen(!isItemsOpen)}
        >
          <span>{item.title}</span>
        </div>
      ) : (
        <Link href={item.urlPath} passHref>
          <div className={`${baseClassName} ${childClassName}`}>
            <span>{item.title}</span>
          </div>
        </Link>
      )}

      {item.children && isItemsOpen && (
        <div className="pl-4">
          {item.children.map((child) => (
            <AsideItem key={child.urlPath} item={child} />
          ))}
        </div>
      )}
    </div>
  );
}
