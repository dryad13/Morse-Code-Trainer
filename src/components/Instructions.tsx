import { Card } from "@/components/ui/card";
import { ArrowRight, ArrowDown } from "lucide-react";

export const Instructions = () => {
  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-xl font-mono text-foreground mb-4">How to Use</h2>
      <div className="space-y-3 font-mono text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <ArrowDown className="w-5 h-5 text-primary" />
          <span>Press <kbd className="px-2 py-1 bg-secondary text-foreground rounded">↓</kbd> for DOT (·)</span>
        </div>
        <div className="flex items-center gap-3">
          <ArrowRight className="w-5 h-5 text-primary" />
          <span>Press <kbd className="px-2 py-1 bg-secondary text-foreground rounded">→</kbd> for DASH (−)</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 text-primary flex items-center justify-center">↵</span>
          <span>Press <kbd className="px-2 py-1 bg-secondary text-foreground rounded">Space</kbd> or <kbd className="px-2 py-1 bg-secondary text-foreground rounded">Enter</kbd> to confirm letter</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 text-destructive flex items-center justify-center">⌫</span>
          <span>Press <kbd className="px-2 py-1 bg-secondary text-foreground rounded">Backspace</kbd> to delete</span>
        </div>
      </div>
    </Card>
  );
};
