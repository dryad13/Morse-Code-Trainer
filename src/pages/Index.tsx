import { useState, useEffect, useCallback } from "react";
import { MorseDisplay } from "@/components/MorseDisplay";
import { MorseTree } from "@/components/MorseTree";
import { Instructions } from "@/components/Instructions";
import { MobileControls } from "@/components/MobileControls";
import { Button } from "@/components/ui/button";
import { decodeMorse } from "@/utils/morseCode";
import { morseAudio } from "@/utils/audioFeedback";
import { toast } from "sonner";
import { Volume2, VolumeX } from "lucide-react";

const Index = () => {
  const [currentSequence, setCurrentSequence] = useState("");
  const [decodedText, setDecodedText] = useState("");
  const [lastChar, setLastChar] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleKeyPress = useCallback((sequence: string) => {
    const char = decodeMorse(sequence);
    setLastChar(char);
    setDecodedText((prev) => prev + char);
    setCurrentSequence("");
    
    if (char === "?") {
      morseAudio.playError();
      toast.error("Unknown morse code sequence");
    } else {
      morseAudio.playSuccess();
    }
  }, []);

  const handleClear = () => {
    setCurrentSequence("");
    setDecodedText("");
    setLastChar("");
    toast.success("Cleared");
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    morseAudio.setEnabled(newState);
    toast.success(newState ? "Sound enabled" : "Sound disabled");
  };

  const handleDot = () => {
    setCurrentSequence((prev) => prev + "·");
    morseAudio.playDot();
  };

  const handleDash = () => {
    setCurrentSequence((prev) => prev + "−");
    morseAudio.playDash();
  };

  const handleSpace = () => {
    if (currentSequence) {
      handleKeyPress(currentSequence);
    } else {
      setDecodedText((prev) => prev + " ");
      setLastChar(" ");
    }
  };

  const handleBackspace = () => {
    if (currentSequence) {
      setCurrentSequence((prev) => prev.slice(0, -1));
    } else if (decodedText) {
      setDecodedText((prev) => prev.slice(0, -1));
      setLastChar("");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for arrow keys
      if (["ArrowRight", "ArrowDown", "ArrowUp", "ArrowLeft", " ", "Enter", "Backspace"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowDown":
          setCurrentSequence((prev) => prev + "·");
          morseAudio.playDot();
          break;
        case "ArrowRight":
          setCurrentSequence((prev) => prev + "−");
          morseAudio.playDash();
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

        {/* Tree section */}
        <MorseTree currentSequence={currentSequence} />

        {/* Mobile Controls */}
        <div className="lg:hidden">
          <MobileControls
            onDot={handleDot}
            onDash={handleDash}
            onSpace={handleSpace}
            onBackspace={handleBackspace}
          />
        </div>

        {/* Message & instructions */}
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <MorseDisplay
              currentSequence={currentSequence}
              decodedText={decodedText}
              lastChar={lastChar}
            />
            <div className="flex gap-2">
              <Button
                onClick={handleClear}
                variant="destructive"
                className="flex-1 font-mono"
              >
                Clear All
              </Button>
              <Button
                onClick={toggleSound}
                variant="secondary"
                size="icon"
                className="font-mono"
                title={soundEnabled ? "Disable sound" : "Enable sound"}
              >
                {soundEnabled ? (
                  <Volume2 className="h-5 w-5" />
                ) : (
                  <VolumeX className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
          <Instructions />
        </div>
      </div>
    </div>
  );
};

export default Index;
