import { Card } from "@/components/ui/card";

interface MorseDisplayProps {
  currentSequence: string;
  decodedText: string;
  lastChar: string;
}

export const MorseDisplay = ({ currentSequence, decodedText, lastChar }: MorseDisplayProps) => {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-card border-border">
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground text-sm mb-2 font-mono">Current Sequence:</p>
            <p className="text-3xl font-mono text-primary tracking-wider min-h-[3rem] flex items-center">
              {currentSequence || <span className="text-muted-foreground">_</span>}
            </p>
          </div>
          
          {lastChar && (
            <div className="border-t border-border pt-4">
              <p className="text-muted-foreground text-sm mb-2 font-mono">Last Character:</p>
              <p className="text-5xl font-mono text-accent font-bold">
                {lastChar}
              </p>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <p className="text-muted-foreground text-sm mb-2 font-mono">Decoded Message:</p>
        <p className="text-xl font-mono text-foreground break-words min-h-[2rem]">
          {decodedText || <span className="text-muted-foreground">Start typing morse code...</span>}
        </p>
      </Card>
    </div>
  );
};
