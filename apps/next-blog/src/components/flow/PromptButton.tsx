import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  PromptButtonDialog,
} from "@monorepo/ui";

interface PromptButtonProps {
  getCopyPrompt: (input: string) => void;
  submitPrompt: (
    json: string | null,
    promptInput: string | null,
  ) => Promise<any>;
}

export default function PromptButton({
  getCopyPrompt,
  submitPrompt,
}: PromptButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-32 h-[90px] ml-2 flex-1 justify-center item-center"
        >
          Copy Prompt
        </Button>
      </DialogTrigger>
      <DialogHeader>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <DialogContent className="min-w-fit">
        <PromptButtonDialog
          getCopyPrompt={getCopyPrompt}
          submitPrompt={submitPrompt}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
