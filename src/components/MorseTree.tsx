import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useRef } from "react";

interface TreeNode {
  char: string;
  x: number;
  y: number;
  dotChild?: TreeNode;
  dashChild?: TreeNode;
}

const buildTree = (): TreeNode => {
  // Level 0 - Root
  const root: TreeNode = { char: "START", x: 400, y: 30 };
  
  // Level 1
  const e: TreeNode = { char: "E", x: 200, y: 100 };
  const t: TreeNode = { char: "T", x: 600, y: 100 };
  root.dotChild = e;
  root.dashChild = t;
  
  // Level 2 - E branch
  const i: TreeNode = { char: "I", x: 100, y: 170 };
  const a: TreeNode = { char: "A", x: 300, y: 170 };
  e.dotChild = i;
  e.dashChild = a;
  
  // Level 2 - T branch
  const n: TreeNode = { char: "N", x: 500, y: 170 };
  const m: TreeNode = { char: "M", x: 700, y: 170 };
  t.dotChild = n;
  t.dashChild = m;
  
  // Level 3 - I branch
  const s: TreeNode = { char: "S", x: 50, y: 240 };
  const u: TreeNode = { char: "U", x: 150, y: 240 };
  i.dotChild = s;
  i.dashChild = u;
  
  // Level 3 - A branch
  const r: TreeNode = { char: "R", x: 250, y: 240 };
  const w: TreeNode = { char: "W", x: 350, y: 240 };
  a.dotChild = r;
  a.dashChild = w;
  
  // Level 3 - N branch
  const d: TreeNode = { char: "D", x: 450, y: 240 };
  const k: TreeNode = { char: "K", x: 550, y: 240 };
  n.dotChild = d;
  n.dashChild = k;
  
  // Level 3 - M branch
  const g: TreeNode = { char: "G", x: 650, y: 240 };
  const o: TreeNode = { char: "O", x: 750, y: 240 };
  m.dotChild = g;
  m.dashChild = o;
  
  // Level 4 - S branch
  const h: TreeNode = { char: "H", x: 25, y: 310 };
  const v: TreeNode = { char: "V", x: 75, y: 310 };
  s.dotChild = h;
  s.dashChild = v;
  
  // Level 4 - U branch
  const f: TreeNode = { char: "F", x: 125, y: 310 };
  u.dotChild = f;
  
  // Level 4 - R branch
  const l: TreeNode = { char: "L", x: 225, y: 310 };
  r.dotChild = l;
  
  // Level 4 - W branch
  const p: TreeNode = { char: "P", x: 325, y: 310 };
  const j: TreeNode = { char: "J", x: 375, y: 310 };
  w.dotChild = p;
  w.dashChild = j;
  
  // Level 4 - D branch
  const b: TreeNode = { char: "B", x: 425, y: 310 };
  const x: TreeNode = { char: "X", x: 475, y: 310 };
  d.dotChild = b;
  d.dashChild = x;
  
  // Level 4 - K branch
  const c: TreeNode = { char: "C", x: 525, y: 310 };
  const y: TreeNode = { char: "Y", x: 575, y: 310 };
  k.dotChild = c;
  k.dashChild = y;
  
  // Level 4 - G branch
  const z: TreeNode = { char: "Z", x: 625, y: 310 };
  const q: TreeNode = { char: "Q", x: 675, y: 310 };
  g.dotChild = z;
  g.dashChild = q;
  
  // Level 4 - O branch (numbers)
  const eight: TreeNode = { char: "8", x: 725, y: 310 };
  const nine: TreeNode = { char: "9", x: 775, y: 310 };
  o.dotChild = eight;
  o.dashChild = nine;
  
  // Level 5 - Add some numbers
  const five: TreeNode = { char: "5", x: 0, y: 380 };
  const four: TreeNode = { char: "4", x: 50, y: 380 };
  h.dotChild = five;
  h.dashChild = { char: "4", x: 50, y: 380 };
  
  const six: TreeNode = { char: "6", x: 450, y: 380 };
  b.dashChild = six;
  
  const seven: TreeNode = { char: "7", x: 650, y: 380 };
  z.dashChild = seven;
  
  const zero: TreeNode = { char: "0", x: 800, y: 380 };
  nine.dashChild = zero;
  
  return root;
};

const renderNode = (node: TreeNode | undefined, isRoot = false): JSX.Element | null => {
  if (!node) return null;
  
  return (
    <g key={`${node.char}-${node.x}-${node.y}`}>
      {/* Draw lines to children */}
      {node.dotChild && (
        <>
          <line
            x1={node.x}
            y1={node.y + 15}
            x2={node.dotChild.x}
            y2={node.dotChild.y - 15}
            className="stroke-primary"
            strokeWidth="2"
            opacity="0.6"
          />
          <text
            x={(node.x + node.dotChild.x) / 2 - 10}
            y={(node.y + node.dotChild.y) / 2}
            className="fill-primary text-xs font-mono"
          >
            ·
          </text>
        </>
      )}
      {node.dashChild && (
        <>
          <line
            x1={node.x}
            y1={node.y + 15}
            x2={node.dashChild.x}
            y2={node.dashChild.y - 15}
            className="stroke-primary"
            strokeWidth="2"
            opacity="0.6"
          />
          <text
            x={(node.x + node.dashChild.x) / 2 + 5}
            y={(node.y + node.dashChild.y) / 2}
            className="fill-primary text-xs font-mono"
          >
            −
          </text>
        </>
      )}
      
      {/* Draw node circle and text */}
      <circle
        cx={node.x}
        cy={node.y}
        r={isRoot ? "20" : "18"}
        className={isRoot ? "fill-primary" : "fill-accent"}
        opacity={isRoot ? "0.8" : "1"}
      />
      <text
        x={node.x}
        y={node.y + 5}
        textAnchor="middle"
        className={`font-mono font-bold text-sm ${isRoot ? "fill-primary-foreground" : "fill-accent-foreground"}`}
      >
        {node.char === "START" ? "⚡" : node.char}
      </text>
      
      {/* Recursively render children */}
      {renderNode(node.dotChild)}
      {renderNode(node.dashChild)}
    </g>
  );
};

export const MorseTree = () => {
  const tree = buildTree();
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  return (
    <Card className="p-6 bg-card border-border h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-mono text-foreground">Morse Code Tree</h2>
        <p className="text-muted-foreground text-sm font-mono mt-1">
          Follow: <span className="text-primary">·</span> (dot/↓) or <span className="text-primary">−</span> (dash/→) | Drag to pan
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div 
          className="min-w-[800px] cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <svg ref={svgRef} width="800" height="420" className="w-full">
            <g transform={`translate(${pan.x}, ${pan.y})`}>
              {renderNode(tree, true)}
            </g>
          </svg>
        </div>
      </ScrollArea>
      
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-muted-foreground text-xs font-mono">
          Common: SOS (···−−−···) | A (·−) | B (−···) | C (−·−·)
        </p>
      </div>
    </Card>
  );
};
