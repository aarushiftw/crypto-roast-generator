
import React, { useState, useEffect } from 'react';
import { useRoast } from '@/contexts/RoastContext';
import TypewriterText from './TypewriterText';
import { Button } from '@/components/ui/button';
import { 
  getRandomRoastOpening, 
  getRandomRoastReaction, 
  getRandomMidRoastReaction,
  getRandomRoastClosing 
} from '@/lib/utils/roastGenerator';
import { Badge } from '@/lib/types/questionnaire';
import { delay } from '@/lib/utils/helpers';

const RoastResult: React.FC = () => {
  const { roastResult, restartQuiz } = useRoast();
  const [displayStage, setDisplayStage] = useState(0);
  const [fullRoastComplete, setFullRoastComplete] = useState(false);

  const roastOpening = getRandomRoastOpening();
  const roastReaction = getRandomRoastReaction();
  const midRoastReaction = getRandomMidRoastReaction();
  const roastClosing = getRandomRoastClosing();

  useEffect(() => {
    const advanceStage = async () => {
      if (!roastResult) return;
      
      // Simulate time between roast segments
      await delay(2000);
      setDisplayStage(1); // Show reaction
      
      await delay(2000);
      setDisplayStage(2); // Show main roast
      
      await delay(3000);
      setDisplayStage(3); // Show specific roasts
      
      await delay(3000);
      setDisplayStage(4); // Show closing
      
      await delay(1500);
      setFullRoastComplete(true);
    };
    
    advanceStage();
  }, [roastResult]);

  if (!roastResult) {
    return <div>Loading your roast...</div>;
  }

  return (
    <div className="p-6 bg-card rounded-lg shadow-lg border border-primary/20 max-w-2xl w-full">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center gradient-text mb-6">
          YOUR CRYPTO ROAST
        </h2>
        
        {displayStage >= 0 && (
          <TypewriterText 
            text={roastOpening} 
            className="text-lg text-primary/90"
          />
        )}
        
        {displayStage >= 1 && (
          <TypewriterText 
            text={roastReaction}
            className="text-lg italic" 
            delay={200}
          />
        )}
        
        {displayStage >= 2 && (
          <>
            <TypewriterText 
              text={midRoastReaction}
              className="text-lg italic" 
              delay={200}
            />
            
            <TypewriterText 
              text={roastResult.roastLine}
              className="text-xl font-bold terminal-text" 
              delay={400}
            />
          </>
        )}
        
        {displayStage >= 3 && (
          <div className="space-y-3">
            {roastResult.specificRoasts.map((roast, index) => (
              <TypewriterText 
                key={index}
                text={`> ${roast}`}
                className="text-lg text-primary/90" 
                delay={500 + index * 400}
              />
            ))}
            
            <div className="mt-6 pt-4 border-t border-primary/20">
              <TypewriterText 
                text={`You're ${roastResult.percentageScore}% crypto degen. ${
                  roastResult.percentageScore > 70 
                    ? "Even BitConnect victims are looking at your trades thinking 'at least I'm not that guy.'" 
                    : "There's still hope for you... barely."
                }`}
                className="text-lg font-medium" 
                delay={1200}
              />
            </div>
          </div>
        )}
        
        {displayStage >= 4 && (
          <TypewriterText 
            text={roastClosing}
            className="text-lg italic text-primary/90" 
            delay={300}
          />
        )}
        
        {fullRoastComplete && (
          <div className="flex justify-center pt-6 animate-fade-in">
            <Button 
              onClick={restartQuiz}
              className="w-2/3"
            >
              Try Again (Are You a Glutton for Pain?)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoastResult;
