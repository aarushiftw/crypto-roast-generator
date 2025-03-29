
import React, { useState } from 'react';
import { useRoast } from '@/contexts/RoastContext';
import TypewriterText from './TypewriterText';
import { Button } from '@/components/ui/button';
import { Flame, Rocket, Zap } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [showStartButton, setShowStartButton] = useState(true);
  const [glitchEffect, setGlitchEffect] = useState(false);
  
  // Trigger random glitch effects
  React.useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 150);
    }, Math.random() * 8000 + 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  const handleTypingComplete = () => {
    setTimeout(() => setShowStartButton(true), 600);
  };

  const handleClick = () => {
    console.log("Button clicked - starting questionnaire");
    onStart();
  };

  return (
    <div className={`p-8 bg-card/80 rounded-lg shadow-lg cyberpunk-border max-w-2xl w-full text-center backdrop-blur-sm relative overflow-hidden ${glitchEffect ? 'animate-glitch' : ''}`}>
      {/* Futuristic background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-primary/5 to-transparent opacity-40 z-0"></div>
      
      {/* Animated glow effect */}
      <div className="absolute inset-0 glow-effect"></div>
      
      {/* Crypto symbols floating around */}
      <div className="absolute top-5 right-10 text-2xl text-primary/30 animate-pulse-slow">₿</div>
      <div className="absolute bottom-10 left-10 text-2xl text-primary/30 animate-bounce-slow">Ξ</div>
      <div className="absolute top-20 left-5 text-xl text-primary/20 animate-pulse">◎</div>
      
      <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 neon-text leading-tight flex items-center justify-center gap-3">
          <Flame className="h-8 w-8 text-orange-500 animate-pulse" />
          <span>Hope Your Gas Fees Covered</span>
          <Flame className="h-8 w-8 text-orange-500 animate-pulse" />
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 crypto-gradient">Emotional Damage</h2>
        
        <div className="space-y-6 px-4 backdrop-blur-sm rounded-lg p-4 bg-black/30 border border-primary/30 shadow-glow-sm">
          <div className="min-h-[100px] flex items-center justify-center">
            <TypewriterText 
              text="Answer honestly or lie, on 4/20, your real onchain imprint will reveal the truth. Everything you did onchain, will reveal what your ENS name desperately tries to rebrand." 
              className="text-md font-medium cyber-text text-center"
              onComplete={handleTypingComplete}
              delay={500}
              typingSpeed={50}
              loop={false}
            />
          </div>
          
          {showStartButton && (
            <div className="flex justify-center pt-6 animate-fade-in">
              <Button
                onClick={handleClick} 
                size="lg"
                className="w-2/3 bg-gradient-to-r from-primary via-purple-500 to-primary text-primary-foreground font-medium border border-primary/50 shadow-glow hover:shadow-glow-sm flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                ROAST ME
                <Rocket className="w-5 h-5 animate-bounce-slow" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
