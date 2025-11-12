import { Card } from "@/components/ui/card";

export const MorseTree = () => {
  return (
    <Card className="p-6 bg-card border-border h-full">
      <h2 className="text-xl font-mono text-foreground mb-4">Morse Code Tree</h2>
      <div className="font-mono text-sm text-foreground leading-relaxed space-y-1">
        <p className="text-muted-foreground mb-3">Follow the branches: → (dot) or ↓ (dash)</p>
        
        <div className="space-y-1 text-xs">
          <p className="text-primary">START</p>
          <p>├─→ <span className="text-accent font-bold">E</span> (·)</p>
          <p>│   ├─→ <span className="text-accent font-bold">I</span> (··)</p>
          <p>│   │   ├─→ <span className="text-accent font-bold">S</span> (···)</p>
          <p>│   │   │   ├─→ <span className="text-accent font-bold">H</span> (····)</p>
          <p>│   │   │   └─↓ <span className="text-accent font-bold">V</span> (···−)</p>
          <p>│   │   └─↓ <span className="text-accent font-bold">U</span> (··−)</p>
          <p>│   │       ├─→ <span className="text-accent font-bold">F</span> (··−·)</p>
          <p>│   │       └─↓ 4 (····−)</p>
          <p>│   └─↓ <span className="text-accent font-bold">A</span> (·−)</p>
          <p>│       ├─→ <span className="text-accent font-bold">R</span> (·−·)</p>
          <p>│       │   ├─→ <span className="text-accent font-bold">L</span> (·−··)</p>
          <p>│       │   └─↓ + (·−·−·)</p>
          <p>│       └─↓ <span className="text-accent font-bold">W</span> (·−−)</p>
          <p>│           ├─→ <span className="text-accent font-bold">P</span> (·−−·)</p>
          <p>│           └─↓ <span className="text-accent font-bold">J</span> (·−−−)</p>
          <p>└─↓ <span className="text-accent font-bold">T</span> (−)</p>
          <p>    ├─→ <span className="text-accent font-bold">N</span> (−·)</p>
          <p>    │   ├─→ <span className="text-accent font-bold">D</span> (−··)</p>
          <p>    │   │   ├─→ <span className="text-accent font-bold">B</span> (−···)</p>
          <p>    │   │   │   └─↓ 6 (−····)</p>
          <p>    │   │   └─↓ <span className="text-accent font-bold">X</span> (−··−)</p>
          <p>    │   └─↓ <span className="text-accent font-bold">K</span> (−·−)</p>
          <p>    │       ├─→ <span className="text-accent font-bold">C</span> (−·−·)</p>
          <p>    │       └─↓ <span className="text-accent font-bold">Y</span> (−·−−)</p>
          <p>    └─↓ <span className="text-accent font-bold">M</span> (−−)</p>
          <p>        ├─→ <span className="text-accent font-bold">G</span> (−−·)</p>
          <p>        │   ├─→ <span className="text-accent font-bold">Z</span> (−−··)</p>
          <p>        │   │   └─↓ 7 (−−···)</p>
          <p>        │   └─↓ <span className="text-accent font-bold">Q</span> (−−·−)</p>
          <p>        └─↓ <span className="text-accent font-bold">O</span> (−−−)</p>
          <p>            ├─→ 8 (−−−··)</p>
          <p>            └─↓ 9 (−−−−·), 0 (−−−−−)</p>
        </div>

        <div className="mt-4 pt-4 border-t border-border space-y-1">
          <p className="text-muted-foreground">Common Sequences:</p>
          <p>· · · (SOS) | ·− (A) | −··· (B)</p>
          <p>−·−· (C) | −·· (D) | · (E)</p>
          <p>··−· (F) | −−· (G) | ···· (H)</p>
        </div>
      </div>
    </Card>
  );
};
