import { useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { toMorseCode } from "@/utils/textToMorse";

interface TreeNode {
  char: string;
  x: number;
  y: number;
  dotChild?: TreeNode;
  dashChild?: TreeNode;
}

interface PathInfo {
  nodes: Set<string>;
  edges: Set<string>;
  currentNode?: TreeNode;
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
  
  // Level 5 - Numbers
  const five: TreeNode = { char: "5", x: 0, y: 380 };
  const four: TreeNode = { char: "4", x: 50, y: 380 };
  const three: TreeNode = { char: "3", x: 100, y: 380 };
  const two: TreeNode = { char: "2", x: 175, y: 380 };
  const one: TreeNode = { char: "1", x: 325, y: 380 };
  const six: TreeNode = { char: "6", x: 450, y: 380 };
  const seven: TreeNode = { char: "7", x: 650, y: 380 };
  const zero: TreeNode = { char: "0", x: 800, y: 380 };
  
  h.dotChild = five;
  h.dashChild = four;
  v.dashChild = three;
  f.dashChild = two;
  j.dashChild = one;
  b.dashChild = six;
  z.dashChild = seven;
  nine.dashChild = zero;
  
  return root;
};

const DOT_COLOR = "#ef4444";
const DASH_COLOR = "#3b82f6";

const findPath = (sequence: string): PathInfo => {
  const result: PathInfo = {
    nodes: new Set<string>(),
    edges: new Set<string>(),
  };
  
  const root = buildTree();
  let current: TreeNode | undefined = root;
  result.nodes.add(`${root.char}-${root.x}-${root.y}`);
  
  for (const symbol of sequence) {
    if (!current) break;
    
    const next = symbol === '·' ? current.dotChild : symbol === '−' ? current.dashChild : undefined;
    if (!next) break;
    
    const edgeKey = `${current.char}-${current.x}-${current.y}->${next.char}-${next.x}-${next.y}-${symbol}`;
    result.edges.add(edgeKey);
    result.nodes.add(`${next.char}-${next.x}-${next.y}`);
    current = next;
  }
  
  result.currentNode = current;
  return result;
};

const renderNode = (
  node: TreeNode | undefined,
  pathInfo: PathInfo,
  isRoot = false,
  onSelectSequence?: (sequence: string) => void
): JSX.Element | null => {
  if (!node) return null;

  const nodeKey = `${node.char}-${node.x}-${node.y}`;
  const isHighlighted = pathInfo.nodes.has(nodeKey);
  const isCurrent = pathInfo.currentNode?.char === node.char &&
                    pathInfo.currentNode?.x === node.x &&
                    pathInfo.currentNode?.y === node.y;
  const isSelectable = node.char !== "START";

  const handleSelect = () => {
    if (!isSelectable || !onSelectSequence) return;

    const sequence = toMorseCode(node.char, {
      letterSeparator: "",
      wordSeparator: "",
    });

    if (!sequence) return;

    onSelectSequence(sequence);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<SVGGElement>) => {
    if (!isSelectable) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelect();
    }
  };

  return (
    <g
      key={nodeKey}
      role={isSelectable ? "button" : undefined}
      tabIndex={isSelectable ? 0 : undefined}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      style={{ cursor: isSelectable ? "pointer" : "default" }}
    >
      {/* Draw lines to children */}
      {node.dotChild && (
        <>
          <line
            x1={node.x}
            y1={node.y + 15}
            x2={node.dotChild.x}
            y2={node.dotChild.y - 15}
            stroke={DOT_COLOR}
            strokeWidth={pathInfo.edges.has(`${nodeKey}->${node.dotChild.char}-${node.dotChild.x}-${node.dotChild.y}-·`) ? "4" : "2"}
            opacity={pathInfo.edges.has(`${nodeKey}->${node.dotChild.char}-${node.dotChild.x}-${node.dotChild.y}-·`) ? "1" : "0.7"}
          />
          <text
            x={(node.x + node.dotChild.x) / 2 - 10}
            y={(node.y + node.dotChild.y) / 2}
            className="font-mono font-bold"
            fontSize="16"
            style={{ fill: DOT_COLOR }}
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
            stroke={DASH_COLOR}
            strokeWidth={pathInfo.edges.has(`${nodeKey}->${node.dashChild.char}-${node.dashChild.x}-${node.dashChild.y}-−`) ? "4" : "2"}
            opacity={pathInfo.edges.has(`${nodeKey}->${node.dashChild.char}-${node.dashChild.x}-${node.dashChild.y}-−`) ? "1" : "0.7"}
          />
          <text
            x={(node.x + node.dashChild.x) / 2 + 5}
            y={(node.y + node.dashChild.y) / 2}
            className="font-mono font-bold"
            fontSize="16"
            style={{ fill: DASH_COLOR }}
          >
            −
          </text>
        </>
      )}
      
      {/* Draw node circle and text */}
      <circle
        cx={node.x}
        cy={node.y}
        r={isRoot ? "20" : isCurrent ? "22" : "18"}
        className={isRoot ? "fill-primary" : isHighlighted ? "fill-primary" : "fill-accent"}
        opacity={isCurrent ? "1" : isRoot ? "0.8" : isHighlighted ? "0.9" : "1"}
        strokeWidth={isCurrent ? "3" : "0"}
        stroke={isCurrent ? "#10b981" : "none"}
      />
      <text
        x={node.x}
        y={node.y + 5}
        textAnchor="middle"
        className={`font-mono font-bold text-sm ${isRoot || isHighlighted ? "fill-primary-foreground" : "fill-accent-foreground"}`}
      >
        {node.char === "START" ? "⚡" : node.char}
      </text>

      {/* Recursively render children */}
      {renderNode(node.dotChild, pathInfo, false, onSelectSequence)}
      {renderNode(node.dashChild, pathInfo, false, onSelectSequence)}
    </g>
  );
};

const MIN_ZOOM = 0.6;
const MAX_ZOOM = 1.8;
const ZOOM_STEP = 0.15;

interface MorseTreeProps {
  currentSequence?: string;
  onSelectSequence?: (sequence: string) => void;
}

export const MorseTree = ({ currentSequence = "", onSelectSequence }: MorseTreeProps) => {
  const tree = buildTree();
  const pathInfo = findPath(currentSequence);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoom = (direction: "in" | "out") => {
    setZoom((prev) => {
      const next = direction === "in" ? prev + ZOOM_STEP : prev - ZOOM_STEP;
      return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(next.toFixed(2))));
    });
  };

  return (
    <Card className="p-6 bg-card border-border h-full flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl font-mono text-foreground">Morse Code Tree</h2>
          <p className="text-muted-foreground text-sm font-mono mt-1">
            Follow: <span className="text-red-500">·</span> (dot/↓) or <span className="text-blue-500">−</span> (dash/→) | Drag to pan
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => handleZoom("out")}
            aria-label="Zoom out"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="font-mono text-sm w-16 text-center">{Math.round(zoom * 100)}%</span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => handleZoom("in")}
            aria-label="Zoom in"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        className="flex-1 rounded-lg border border-border bg-background cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg viewBox="0 0 850 420" className="h-[460px] w-full select-none">
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {renderNode(tree, pathInfo, true, onSelectSequence)}
          </g>
        </svg>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-muted-foreground text-xs font-mono">
          Common: SOS (···−−−···) | A (·−) | B (−···) | C (−·−·)
        </p>
      </div>
    </Card>
  );
};
