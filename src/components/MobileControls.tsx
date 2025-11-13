import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, ArrowDown, ArrowRight, Space, Delete } from "lucide-react";

interface MobileControlsProps {
  onDot: () => void;
  onDash: () => void;
  onSpace: () => void;
  onBackspace: () => void;
}

export const MobileControls = ({ onDot, onDash, onSpace, onBackspace }: MobileControlsProps) => {
  return (
    <Card className="p-4 bg-card border-border">
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onDot}
            size="lg"
            className="h-20 text-xl font-mono font-bold bg-red-500 hover:bg-red-600 text-white"
          >
            <span className="flex flex-col items-center gap-1">
              <span className="text-3xl">·</span>
              <span className="text-xs">DOT (↓)</span>
            </span>
          </Button>
          <Button
            onClick={onDash}
            size="lg"
            className="h-20 text-xl font-mono font-bold bg-blue-500 hover:bg-blue-600 text-white"
          >
            <span className="flex flex-col items-center gap-1">
              <span className="text-3xl">−</span>
              <span className="text-xs">DASH (→)</span>
            </span>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onSpace}
            variant="outline"
            size="lg"
            className="h-14 font-mono"
          >
            <Space className="h-5 w-5 mr-2" />
            Space
          </Button>
          <Button
            onClick={onBackspace}
            variant="outline"
            size="lg"
            className="h-14 font-mono"
          >
            <Delete className="h-5 w-5 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};
