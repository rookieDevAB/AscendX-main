import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  StopCircle, 
  Volume2, 
  VolumeX,
  FastForward, 
  Rewind 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TextToSpeechProps {
  text: string;
  chapterTitle: string;
}

export function TextToSpeech({ text, chapterTitle }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [rate, setRate] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [highlightedText, setHighlightedText] = useState<string>("");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const previousTextRef = useRef<string>("");
  
  // Initialize speech synthesis and get available voices
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      // Get voices when component mounts
      const getVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length > 0) {
          setVoices(availableVoices);
          // Set default voice (prefer English voices)
          const defaultVoice = availableVoices.find(voice => 
            voice.lang.includes('en-') && voice.localService
          ) || availableVoices[0];
          if (defaultVoice) {
            setSelectedVoice(defaultVoice.name);
          }
        }
      };

      // Chrome needs a little delay to get voices
      setTimeout(getVoices, 100);
      
      // Some browsers have a voiceschanged event
      window.speechSynthesis.onvoiceschanged = getVoices;
      
      // Cleanup
      return () => {
        if (utteranceRef.current && window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, []);
  
  // Handle text changes (for new chapters)
  useEffect(() => {
    if (text !== previousTextRef.current) {
      previousTextRef.current = text;
      
      // If we're reading and the text changes, stop the current reading
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setIsPaused(false);
      }
    }
  }, [text, isPlaying]);
  
  const startSpeaking = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create a new utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;
      
      // Set voice if selected
      if (selectedVoice) {
        const voice = voices.find(v => v.name === selectedVoice);
        if (voice) utterance.voice = voice;
      }
      
      // Set other properties
      utterance.volume = isMuted ? 0 : volume;
      utterance.rate = rate;
      
      // Event handlers
      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
      };
      
      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
      
      utterance.onpause = () => {
        setIsPaused(true);
      };
      
      utterance.onresume = () => {
        setIsPaused(false);
      };
      
      utterance.onboundary = (event) => {
        // Get the current word/sentence being spoken
        if (event.name === 'word' && typeof event.charIndex === 'number') {
          const currentText = text.substring(event.charIndex, event.charIndex + event.charLength);
          setHighlightedText(currentText);
        }
      };
      
      // Start speaking
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const pauseSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };
  
  const resumeSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };
  
  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };
  
  const handleVolumeChange = (newVolume: number[]) => {
    const value = newVolume[0];
    setVolume(value);
    
    // Update current speech if playing
    if (utteranceRef.current && isPlaying) {
      utteranceRef.current.volume = isMuted ? 0 : value;
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    // Update current speech if playing
    if (utteranceRef.current && isPlaying) {
      utteranceRef.current.volume = !isMuted ? 0 : volume;
    }
  };
  
  const handleRateChange = (newRate: number[]) => {
    const value = newRate[0];
    setRate(value);
    
    // If we're currently speaking, we need to restart with the new rate
    if (isPlaying) {
      stopSpeaking();
      setTimeout(() => {
        startSpeaking();
      }, 100);
    }
  };
  
  const increaseRate = () => {
    const newRate = Math.min(rate + 0.25, 2);
    setRate(newRate);
    
    // If we're currently speaking, we need to restart with the new rate
    if (isPlaying) {
      stopSpeaking();
      setTimeout(() => {
        startSpeaking();
      }, 100);
    }
  };
  
  const decreaseRate = () => {
    const newRate = Math.max(rate - 0.25, 0.5);
    setRate(newRate);
    
    // If we're currently speaking, we need to restart with the new rate
    if (isPlaying) {
      stopSpeaking();
      setTimeout(() => {
        startSpeaking();
      }, 100);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Text to Speech</h3>
        <p className="text-xs text-muted-foreground">
          {isPlaying ? (isPaused ? "Paused" : "Reading...") : "Ready"}
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        {!isPlaying ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={startSpeaking}
            className="flex-1"
          >
            <Play className="h-4 w-4 mr-2" />
            Read Aloud
          </Button>
        ) : (
          <>
            {isPaused ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resumeSpeaking}
              >
                <Play className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={pauseSpeaking}
              >
                <Pause className="h-4 w-4" />
              </Button>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={stopSpeaking}
            >
              <StopCircle className="h-4 w-4" />
            </Button>
          </>
        )}
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={decreaseRate}
        >
          <Rewind className="h-4 w-4" />
        </Button>
        
        <span className="text-xs font-mono">
          {rate.toFixed(1)}x
        </span>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={increaseRate}
        >
          <FastForward className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleMute}
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Volume</span>
            <span className="text-xs font-mono">{Math.round(volume * 100)}%</span>
          </div>
          <Slider
            value={[volume]}
            min={0}
            max={1}
            step={0.05}
            onValueChange={handleVolumeChange}
            disabled={isMuted}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Speed</span>
            <span className="text-xs font-mono">{rate.toFixed(1)}x</span>
          </div>
          <Slider
            value={[rate]}
            min={0.5}
            max={2}
            step={0.1}
            onValueChange={handleRateChange}
          />
        </div>
      </div>
      
      {voices.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">Voice</label>
          <Select
            value={selectedVoice}
            onValueChange={(value) => {
              setSelectedVoice(value);
              
              // If we're currently speaking, we need to restart with the new voice
              if (isPlaying) {
                stopSpeaking();
                setTimeout(() => {
                  startSpeaking();
                }, 100);
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent>
              {voices.map((voice) => (
                <SelectItem key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      {isPlaying && !isPaused && highlightedText && (
        <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
          <p className="text-sm font-medium">Currently reading:</p>
          <p className="text-sm italic">"{highlightedText}"</p>
        </div>
      )}
    </div>
  );
} 