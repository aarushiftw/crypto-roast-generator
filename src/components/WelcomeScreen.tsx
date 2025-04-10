
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
        <div className="screen-inner text-center flex flex-col justify-between py-8">
          <h1 className="text-8xl font-medium text-white leading-snug mb-4 mt-2">
            Hope Your Gas Fees
            <br />
            Covered Emotional Damage
          </h1>
          
          <div className="px-4 my-4">
            <TypewriterText 
              text="Answer honestly or lie, your real onchain imprint will reveal the truth your ENS name desperately tries to rebrand." 
              className="text-sm font-medium terminal-text text-center"
              onComplete={handleTypingComplete}
              delay={500}
              typingSpeed={50}
              loop={false}
            />
          </div>
          
          {showStartButton && (
            <div className="mt-4 mb-2 animate-fade-in">
              <Button
                onClick={handleClick} 
                size="lg"
                className="w-3/4 bg-white text-black hover:bg-gray-100 rounded-sm font-bold uppercase tracking-wider shadow-xl transform transition-all hover:scale-[1.02] active:scale-95 border border-gray-300 hover:shadow-2xl active:shadow-lg"
              >
                Roast Me
              </Button>
            </div>
          )}
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
