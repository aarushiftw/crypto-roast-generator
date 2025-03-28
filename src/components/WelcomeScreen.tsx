
import React, { useState } from 'react';
import { useRoast } from '@/contexts/RoastContext';
import TypewriterText from './TypewriterText';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [showStartButton, setShowStartButton] = useState(false);
  
  const handleTypingComplete = () => {
    setTimeout(() => setShowStartButton(true), 600);
  };

  const handleClick = () => {
    console.log("Button clicked - starting questionnaire");
    onStart();
  };

  return (
    <div className="p-8 bg-card/80 rounded-lg shadow-lg cyberpunk-border max-w-2xl w-full text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
        Ready to have your onchain existence mercilessly judged?
      </h1>
      
      <div className="space-y-6 px-4">
        <TypewriterText 
          text="Answer honestly or lie, on 4/20, your real onchain imprint will reveal the truth. Everything you did onchain, will reveal what your ENS name desperately tries to rebrand." 
          className="text-lg font-medium terminal-text text-center"
          onComplete={handleTypingComplete}
        />
        
        {showStartButton && (
          <div className="flex justify-center pt-6 animate-fade-in">
            <Button
              onClick={handleClick} 
              size="lg"
              className="w-2/3 bg-primary/90 hover:bg-primary text-primary-foreground font-medium"
            >
              Roast Me
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
