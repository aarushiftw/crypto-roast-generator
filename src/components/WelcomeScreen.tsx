
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
    <div className="p-8 bg-card rounded-lg shadow-lg border border-primary/20 max-w-2xl w-full text-center">
      <h1 className="text-3xl font-bold mb-10 gradient-text">CRYPTO ROAST BOT</h1>
      
      <div className="space-y-6 text-left">
        <TypewriterText 
          text="Ready to have your sad crypto existence mercilessly judged?" 
          className="text-xl font-medium terminal-text"
          onComplete={handleTypingComplete}
        />
        
        {showStartButton && (
          <div className="flex justify-center pt-6 animate-fade-in">
            <Button
              onClick={handleClick} 
              size="lg"
              className="w-2/3"
            >
              Roast Me
            </Button>
          </div>
        )}
      </div>
      
      <p className="mt-10 text-sm text-muted-foreground">
        Answer questions about your crypto habits and receive a personalized roast
      </p>
    </div>
  );
};

export default WelcomeScreen;
