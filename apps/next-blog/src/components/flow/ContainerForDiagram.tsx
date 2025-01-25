"use client";
import { useEffect, useState } from "react";
import { BsDiagram3Fill } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import DiagramContainerForText from "./DiagramContainerForText";
import { text } from "node:stream/consumers";
import structures from "../../diagrams/structures";
import { Structures } from "@/lib/types";

export default function ContainerForDiagram({
  children,
  structureKey,
  type,
}: {
  children: string;
  structureKey: string;
  type: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const getStructures = (structureKey: string): any => {
    return structures[structureKey];
  };

  return (
    <div>
      <div className="bg-white border pt-8 pr-4 pl-4 pb-4 flex flex-col relative hidden md:block">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <button
              className="absolute top-[4px] right-4 space-x-2 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
              title="Open Diagram"
            >
              {/* <span className="text-sm font-medium">Dialog</span> */}
              <BsDiagram3Fill size={20} />
            </button>
          </DialogTrigger>
          {/* 공간 차지해서 주석처리 */}
          {/* <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader> */}
          <DialogContent className="min-w-fit">
            <DiagramContainerForText
              displayText={children}
              structures={getStructures(structureKey)}
              type={type}
            />
          </DialogContent>
        </Dialog>

        <div className="mt-4">{children}</div>
      </div>
      <div className="block md:hidden">{children}</div>
    </div>
  );
}
