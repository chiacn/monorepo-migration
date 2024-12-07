"use client";
import { useState } from "react";
import DiagramContainer from "@/components/flow/DiagramContainer";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import ContainerForDiagram from "./ContainerForDiagram";

export default function FlowDiagramButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed top-24 right-32 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="p-3 rounded-full bg-black text-white shadow-lg transition focus:outline-none">
            Open Prompt Search
          </Button>
        </DialogTrigger>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogContent className="min-w-fit">
          <div className="p-8">
            <DiagramContainer />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
