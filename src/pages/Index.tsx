import { useState, useEffect, useCallback, useRef } from "react";
import { MorseDisplay } from "@/components/MorseDisplay";
import { MorseTree } from "@/components/MorseTree";
import { Instructions } from "@/components/Instructions";
import { MobileControls } from "@/components/MobileControls";
import { MessagePlayer } from "@/components/MessagePlayer";
import { MessageHistory } from "@/components/MessageHistory";
import { Button } from "@/components/ui/button";
import { decodeMorse } from "@/utils/morseCode";
import { textToMorse } from "@/utils/textToMorse";
import { morseAudio } from "@/utils/audioFeedback";
import { toast } from "sonner";
import { Volume2, VolumeX } from "lucide-react";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
}

const Index = () => {
  const [currentSequence, setCurrentSequence] = useState("");
  const [decodedText, setDecodedText] = useState("");
  const [lastChar, setLastChar] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const playbackRef = useRef<NodeJS.Timeout | null>(null);

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

  const stopPlayback = useCallback(() => {
    if (playbackRef.current) {
      clearTimeout(playbackRef.current);
      playbackRef.current = null;
    }
    setIsPlaying(false);
    setCurrentSequence("");
  }, []);

  const handleTreeSequenceSelect = (sequence: string) => {
    if (!sequence) return;

    if (isPlaying) {
      stopPlayback();
    }

    setCurrentSequence(sequence);
    setLastChar("");
  };

  const playMorseSequence = async (
    text: string,
    { addToHistory = true }: { addToHistory?: boolean } = {}
  ) => {
    if (isPlaying) {
      stopPlayback();
      return;
    }

    if (addToHistory) {
      // Add to history
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        timestamp: new Date(),
      };
      setMessages((prev) => [newMessage, ...prev]);
    }

    setIsPlaying(true);
    const morseSequences = textToMorse(text);
    
    let index = 0;
    
    const playNext = () => {
      if (index >= morseSequences.length) {
        setIsPlaying(false);
        setCurrentSequence("");
        return;
      }

      const sequence = morseSequences[index];
      
      if (sequence === " ") {
        // Space between words
        setCurrentSequence("");
        index++;
        playbackRef.current = setTimeout(playNext, 400);
        return;
      }

      // Play each dot/dash in the sequence
      let dotDashIndex = 0;
      let builtSequence = "";

      const playDotDash = () => {
        if (dotDashIndex >= sequence.length) {
          // Finished this character, move to next
          index++;
          playbackRef.current = setTimeout(playNext, 300);
          return;
        }

        const symbol = sequence[dotDashIndex];
        builtSequence += symbol;
        setCurrentSequence(builtSequence);
        
        if (symbol === "·") {
          morseAudio.playDot();
          dotDashIndex++;
          playbackRef.current = setTimeout(playDotDash, 150);
        } else if (symbol === "−") {
          morseAudio.playDash();
          dotDashIndex++;
          playbackRef.current = setTimeout(playDotDash, 350);
        }
      };

      playDotDash();
    };

    playNext();
  };

  const handleDeleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const handleClearAllMessages = () => {
    setMessages([]);
    toast.success("History cleared");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept keys during playback
      if (isPlaying) return;

      // Ignore typing inside inputs/textareas/contentEditable
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isEditable = tag === 'input' || tag === 'textarea' || (target as any)?.isContentEditable;
      if (isEditable) return;

      // Prevent default behavior for navigation/confirm keys
      if (["ArrowRight", "ArrowDown", "ArrowUp", "ArrowLeft", " ", "Enter", "Backspace", ".", "-", "/"].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowDown":
        case ".":
        case "e":
        case "E":
          setCurrentSequence((prev) => prev + "·");
          morseAudio.playDot();
          break;
        case "ArrowRight":
        case "-":
        case "t":
        case "T":
          setCurrentSequence((prev) => prev + "−");
          morseAudio.playDash();
          break;
        case " ":
        case "Enter":
        case "/": // Optional: slash as word separator
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
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSequence, decodedText, handleKeyPress, isPlaying]);

  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, [stopPlayback]);

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
        <MorseTree
          currentSequence={currentSequence}
          onSelectSequence={handleTreeSequenceSelect}
        />

        {/* Mobile Controls */}
        <div className="lg:hidden">
          <MobileControls
            onDot={handleDot}
            onDash={handleDash}
            onSpace={handleSpace}
            onBackspace={handleBackspace}
          />
        </div>

        {/* Message Player */}
        <MessagePlayer
          onPlay={playMorseSequence}
          onStop={stopPlayback}
          isPlaying={isPlaying}
        />

        {/* Message History */}
        <MessageHistory
          messages={messages}
          onPlay={(text) => playMorseSequence(text, { addToHistory: false })}
          onDelete={handleDeleteMessage}
          onClearAll={handleClearAllMessages}
        />

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
                disabled={isPlaying}
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
