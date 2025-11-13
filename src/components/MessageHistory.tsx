import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
}

interface MessageHistoryProps {
  messages: Message[];
  onPlay: (text: string) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export const MessageHistory = ({
  messages,
  onPlay,
  onDelete,
  onClearAll,
}: MessageHistoryProps) => {
  if (messages.length === 0) {
    return null;
  }

  return (
    <Card className="p-4 bg-card border-border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-mono font-semibold text-primary">Message History</h3>
        <Button
          onClick={onClearAll}
          variant="ghost"
          size="sm"
          className="h-7 text-xs font-mono text-muted-foreground hover:text-destructive"
        >
          Clear All
        </Button>
      </div>
      <ScrollArea className="h-[200px]">
        <div className="space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className="flex items-center justify-between gap-2 p-2 rounded bg-secondary/50 border border-border/50"
            >
              <span className="font-mono text-sm text-foreground flex-1 truncate">
                {message.text}
              </span>
              <div className="flex gap-1">
                <Button
                  onClick={() => onPlay(message.text)}
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 hover:bg-morse-active/20 hover:text-morse-active"
                  title="Play in morse"
                >
                  <Play className="h-3 w-3" />
                </Button>
                <Button
                  onClick={() => onDelete(message.id)}
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 hover:bg-destructive/20 hover:text-destructive"
                  title="Delete"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
