
import React, { useState } from 'react';
import { useRoast } from '@/contexts/RoastContext';
import TypewriterText from './TypewriterText';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [showStartButton, setShowStartButton] = useState(true);
  
  const handleTypingComplete = () => {
    setTimeout(() => setShowStartButton(true), 600);
  };

  const handleClick = () => {
    console.log("Button clicked - starting questionnaire");
    onStart();
  };

  return (
    <div className="tamagotchi-container">
      <div className="tamagotchi-top-lights">
        <div className="light light-left"></div>
        <div className="light light-right"></div>
      </div>
      
      <div className="tamagotchi-screen">
        <div className="screen-inner text-center flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-4 gradient-text leading-tight">
            Hope Your Gas Fees
            <br />
            Covered Emotional Damage
          </h1>
          
          <div className="space-y-4 px-2 flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-center">
              <TypewriterText 
                text="Answer honestly or lie, your real onchain imprint will reveal the truth. What your ENS name desperately tries to rebrand." 
                className="text-sm font-medium terminal-text text-center"
                onComplete={handleTypingComplete}
                delay={500}
                typingSpeed={50}
                loop={false}
              />
            </div>
            
            {showStartButton && (
              <div className="flex justify-center pt-4 animate-fade-in">
                <Button
                  onClick={handleClick} 
                  size="sm"
                  className="w-2/3 bg-primary/90 hover:bg-primary text-primary-foreground font-medium"
                >
                  Roast Me
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="tamagotchi-buttons">
        <div className="button-left"></div>
        <div className="button-middle"></div>
        <div className="button-right"></div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
