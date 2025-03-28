
import React, { useState, useEffect } from 'react';
import { useRoast } from '@/contexts/RoastContext';
import { 
  getRandomRoastOpening, 
  getRandomRoastReaction, 
  getRandomMidRoastReaction,
  getRandomRoastClosing 
} from '@/lib/utils/roastGenerator';
import { delay } from '@/lib/utils/helpers';
import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RoastResult: React.FC = () => {
  const { roastResult, restartQuiz } = useRoast();
  const [displayStage, setDisplayStage] = useState(0);
  const [fullRoastComplete, setFullRoastComplete] = useState(false);
  const [nftLevel, setNftLevel] = useState(1);

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
      
      // Display stages with appropriate timing
      await delay(500);
      setDisplayStage(1); // Show reaction
      
      await delay(1000);
      setDisplayStage(2); // Show main roast
      
      await delay(1500);
      setDisplayStage(3); // Show specific roasts
      
      await delay(2000);
      setDisplayStage(4); // Show closing
      
      await delay(1000);
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
    <div className="p-6 bg-card/80 rounded-lg shadow-lg cyberpunk-border max-w-2xl w-full">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center gradient-text mb-6">
          YOUR ONCHAIN VERDICT
        </h2>
        
        {displayStage >= 0 && (
          <p className="text-lg text-primary/90">{roastOpening}</p>
        )}
        
        {displayStage >= 1 && (
          <p className="text-lg italic text-foreground/80 animate-fade-in">{roastReaction}</p>
        )}
        
        {displayStage >= 2 && (
          <div className="animate-fade-in">
            <p className="text-lg italic text-foreground/80 mb-3">{midRoastReaction}</p>
            
            <p className="text-xl font-bold terminal-text py-2">{roastResult.roastLine}</p>
          </div>
        )}
        
        {displayStage >= 3 && (
          <div className="space-y-3 animate-fade-in">
            {roastResult.specificRoasts.map((roast, index) => (
              <p key={index} className="text-lg text-primary/90">
                &gt; {roast}
              </p>
            ))}
            
            <div className="mt-6 pt-4 border-t border-primary/20">
              <p className="text-lg font-medium animate-fade-in">
                You're likely to mint a Level {nftLevel} NFT. {
                  roastResult.percentageScore > 70 
                    ? "Even BitConnect victims are looking at your trades thinking 'at least I'm not that guy.'" 
                    : "There's still hope for you... barely."
                }
              </p>
            </div>
          </div>
        )}
        
        {displayStage >= 4 && (
          <div className="animate-fade-in">
            <p className="text-lg italic text-primary/90 mb-4">{roastClosing}</p>
            
            <p className="text-lg text-foreground/90 border-t border-primary/20 pt-4 mt-4">
              Come 4/20, Brahma's onchain imprint NFT will expose the truth.
            </p>
          </div>
        )}
        
        {fullRoastComplete && (
          <div className="space-y-4 animate-fade-in pt-2">
            <div className="flex justify-center">
              <a 
                href="https://t.me/brahmanetwork" 
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-block px-6 py-3 bg-secondary hover:bg-secondary/80 text-foreground 
                  rounded-md transition-colors duration-300 font-medium"
              >
                Remind me to mint
              </a>
            </div>
            
            <Button 
              onClick={handleShareOnTwitter}
              className="w-full flex items-center justify-center gap-2 bg-primary/80 hover:bg-primary text-primary-foreground"
            >
              <Share size={18} />
              Share My Roast Report
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoastResult;
