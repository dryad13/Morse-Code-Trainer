import { useState, useEffect, useCallback } from "react";
import { MorseDisplay } from "@/components/MorseDisplay";
import { MorseTree } from "@/components/MorseTree";
import { Instructions } from "@/components/Instructions";
import { Button } from "@/components/ui/button";
import { decodeMorse } from "@/utils/morseCode";
import { toast } from "sonner";

const Index = () => {
  const [currentSequence, setCurrentSequence] = useState("");
  const [decodedText, setDecodedText] = useState("");
  const [lastChar, setLastChar] = useState("");

  const handleKeyPress = useCallback((sequence: string) => {
    const char = decodeMorse(sequence);
    setLastChar(char);
    setDecodedText((prev) => prev + char);
    setCurrentSequence("");
    
    if (char === "?") {
      toast.error("Unknown morse code sequence");
    }
  }, []);

  const handleClear = () => {
    setCurrentSequence("");
    setDecodedText("");
    setLastChar("");
    toast.success("Cleared");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for arrow keys
      if (["ArrowRight", "ArrowDown", "ArrowUp", "ArrowLeft", " ", "Enter", "Backspace"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowRight":
          setCurrentSequence((prev) => prev + "·");
          break;
        case "ArrowDown":
          setCurrentSequence((prev) => prev + "−");
          break;
        case " ":
        case "Enter":
          if (currentSequence) {
            handleKeyPress(currentSequence);
          } else {
            setDecodedText((prev) => prev + " ");
            setLastChar(" ");
          }
          break;
        case "Backspace":
          if (currentSequence) {
            setCurrentSequence((prev) => prev.slice(0, -1));
          } else if (decodedText) {
            setDecodedText((prev) => prev.slice(0, -1));
            setLastChar("");
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSequence, decodedText, handleKeyPress]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-primary tracking-wider">
            MORSE CODE TRAINER
          </h1>
          <p className="text-muted-foreground font-mono">
            Practice morse code using your keyboard
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <MorseDisplay
              currentSequence={currentSequence}
              decodedText={decodedText}
              lastChar={lastChar}
            />
            <Instructions />
            <Button
              onClick={handleClear}
              variant="destructive"
              className="w-full font-mono"
            >
              Clear All
            </Button>
          </div>

          {/* Right Column */}
          <MorseTree />
        </div>
      </div>
    </div>
  );
};

export default Index;
