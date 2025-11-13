import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Square } from "lucide-react";

interface MessagePlayerProps {
  onPlay: (text: string) => void;
  onStop: () => void;
  isPlaying: boolean;
}

export const MessagePlayer = ({ onPlay, onStop, isPlaying }: MessagePlayerProps) => {
  const [inputText, setInputText] = useState("");

  const handlePlay = () => {
    if (inputText.trim()) {
      onPlay(inputText.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isPlaying) {
      handlePlay();
    }
  };

  return (
    <Card className="p-4 bg-card border-border">
      <h3 className="font-mono font-semibold text-primary mb-3">
        Play Message in Morse
      </h3>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Type a message to hear in morse code..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isPlaying}
          className="font-mono bg-input border-border text-foreground placeholder:text-muted-foreground"
        />
        {!isPlaying ? (
          <Button
            onClick={handlePlay}
            disabled={!inputText.trim()}
            className="font-mono bg-accent hover:bg-accent/80 text-accent-foreground"
          >
            <Play className="h-4 w-4 mr-2" />
            Play
          </Button>
        ) : (
          <Button
            onClick={onStop}
            variant="destructive"
            className="font-mono"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop
          </Button>
        )}
      </div>
    </Card>
  );
};
