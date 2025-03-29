
import React, { useState, useEffect } from 'react';
import { useRoast } from '@/contexts/RoastContext';
import { 
  getRandomRoastOpening, 
  getRandomRoastReaction, 
  getRandomMidRoastReaction,
  getRandomRoastClosing 
} from '@/lib/utils/roastGenerator';
import { delay } from '@/lib/utils/helpers';
import { Share, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TypewriterText from './TypewriterText';

const RoastResult: React.FC = () => {
  const { roastResult, restartQuiz } = useRoast();
  const [displayStage, setDisplayStage] = useState(0);
  const [fullRoastComplete, setFullRoastComplete] = useState(false);
  const [nftLevel, setNftLevel] = useState(1);
  const [visibleSpecificRoasts, setVisibleSpecificRoasts] = useState<number[]>([]);

  const roastOpening = getRandomRoastOpening();
  const roastReaction = getRandomRoastReaction();
  const midRoastReaction = getRandomMidRoastReaction();
  const roastClosing = getRandomRoastClosing();

  useEffect(() => {
    const advanceStage = async () => {
      if (!roastResult) return;

      // Calculate NFT level (1-4) based on percentage score
      const level = Math.min(4, Math.max(1, Math.ceil(roastResult.percentageScore / 25)));
      setNftLevel(level);
      
      // Display stages sequentially with 1-second gaps (shortened)
      setDisplayStage(1);
      await delay(1000);
      
      // After opening and reaction, show main roast line
      setDisplayStage(2);
      await delay(1000);
      
      // After main roast, show specific roasts one by one
      setDisplayStage(3);
      
      // Show up to 2 specific roasts max to avoid scrolling
      const maxRoasts = Math.min(2, roastResult.specificRoasts.length);
      for (let i = 0; i < maxRoasts; i++) {
        await delay(1000);
        setVisibleSpecificRoasts(prev => [...prev, i]);
      }
      
      // Show final section
      await delay(1000);
      setDisplayStage(4);
      setFullRoastComplete(true);
    };
    
    advanceStage();
  }, [roastResult]);

  const handleShareOnTwitter = () => {
    if (!roastResult) return;
    
    const tweetText = encodeURIComponent(
      `I just got absolutely destroyed by the Crypto Roast Bot! I'm likely to mint a Level ${nftLevel} NFT. Come get roasted yourself: `
    );
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(window.location.href)}`;
    window.open(tweetUrl, '_blank');
  };

  if (!roastResult) {
    return <div>Loading your roast...</div>;
  }

  return (
    <div className="tamagotchi-container max-w-2xl w-full">
      <div className="tamagotchi-top-lights">
        <div className="light light-left"></div>
        <div className="light light-right"></div>
      </div>
      
      <div className="tamagotchi-screen">
        <div className="screen-inner space-y-3"> {/* Reduced spacing */}
          <h2 className="text-xl font-bold text-center gradient-text mb-2"> {/* Reduced size and margin */}
            YOUR ONCHAIN VERDICT
          </h2>
          
          {displayStage >= 1 && (
            <div className="animate-fade-in">
              <p className="text-sm text-primary/90">{roastOpening}</p> {/* Reduced text size */}
              <p className="text-sm italic text-foreground/80 mt-1">{roastReaction}</p> {/* Reduced text size and margin */}
            </div>
          )}
          
          {displayStage >= 2 && (
            <div className="animate-fade-in">
              <p className="text-sm italic text-foreground/80 mb-1">{midRoastReaction}</p> {/* Reduced text size and margin */}
              <p className="text-base font-bold terminal-text py-1">{roastResult.roastLine}</p> {/* Reduced size and padding */}
            </div>
          )}
          
          {displayStage >= 3 && (
            <div className="space-y-1"> {/* Reduced spacing */}
              {roastResult.specificRoasts.slice(0, 2).map((roast, index) => ( /* Limit to first 2 roasts */
                visibleSpecificRoasts.includes(index) && (
                  <p key={index} className="text-sm text-primary/90 animate-fade-in"> {/* Reduced text size */}
                    &gt; {roast}
                  </p>
                )
              ))}
            </div>
          )}
          
          {displayStage >= 4 && (
            <div className="animate-fade-in">
              <div className="mt-2 pt-2 border-t border-primary/20"> {/* Reduced margin and padding */}
                <p className="text-sm font-medium"> {/* Reduced text size */}
                  You're likely to mint a Level {nftLevel} NFT. {
                    roastResult.percentageScore > 70 
                      ? "Even BitConnect victims are looking at you." 
                      : "There's still hope... barely."
                  }
                </p>
              </div>
              
              <div className="mt-2"> {/* Reduced margin */}
                <p className="text-sm text-foreground/90 border-t border-primary/20 pt-2 mt-2"> {/* Reduced text size, margin and padding */}
                  Come 4/20, Brahma's onchain imprint NFT will expose the truth.
                </p>
              </div>
              
              <div className="space-y-2 pt-2"> {/* Reduced spacing and padding */}
                <div className="flex justify-center">
                  <a 
                    href="https://t.me/BrahmaRewards" 
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground 
                      rounded-md transition-colors duration-300 text-sm font-medium" /* Reduced padding and text size */
                  >
                    <Bot size={16} className="text-primary" /> {/* Reduced icon size */}
                    Remind me to mint
                  </a>
                </div>
                
                <Button 
                  onClick={handleShareOnTwitter}
                  className="w-full flex items-center justify-center gap-2 bg-primary/80 hover:bg-primary text-primary-foreground text-sm" /* Added text-sm */
                >
                  <Share size={16} /> {/* Reduced icon size */}
                  Share My Roast Report
                </Button>
              </div>
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

export default RoastResult;
