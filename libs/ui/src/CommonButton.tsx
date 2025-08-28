import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./button";

type variant =
  | "outline"
  | "default"
  | "destructive"
  | "secondary"
  | "ghost"
  | "link"
  | null
  | undefined;

interface CommonButtonProps {
  onClick: (item?: any) => void | Promise<void | object>;
  className: string;
  variant?: variant;
  isLoading: boolean;
  children: ReactNode;
}
export default function CommonButton({
  onClick,
  className,
  variant = "default",
  isLoading,
  children,
}: CommonButtonProps) {
  return (
    <>
      {isLoading ? (
        <Button variant={variant} className={className} disabled>
          <Loader2 className="animate-spin" />
        </Button>
      ) : (
        <Button
          variant={variant}
          className={className}
          onClick={() => onClick()}
        >
          {children}
        </Button>
      )}
    </>
  );
}
