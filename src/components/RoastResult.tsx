
import React, { useState, useEffect } from 'react';
import { useRoast } from '@/contexts/RoastContext';
import { 
  getRandomRoastOpening, 
  getRandomRoastReaction, 
  getRandomMidRoastReaction,
  getRandomRoastClosing 
} from '@/lib/utils/roastGenerator';
import { delay } from '@/lib/utils/helpers';
import { Share, Bell } from 'lucide-react';
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
      
      // Display all stages immediately instead of sequentially
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
    <div className="p-6 bg-card/80 rounded-lg shadow-lg cyberpunk-border max-w-2xl w-full relative overflow-hidden">
      {/* Cyberpunk grid lines */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-grid-pattern opacity-10 z-0"></div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/10 to-transparent opacity-30 z-0"></div>
      
      <div className="relative z-10 space-y-6">
        <h2 className="text-2xl font-bold text-center gradient-text mb-6">
          YOUR ONCHAIN VERDICT
        </h2>
        
        <p className="text-lg text-primary/90">{roastOpening}</p>
        <p className="text-lg italic text-foreground/80">{roastReaction}</p>
        
        <div>
          <p className="text-lg italic text-foreground/80 mb-3">{midRoastReaction}</p>
          <p className="text-xl font-bold terminal-text py-2">{roastResult.roastLine}</p>
        </div>
        
        <div className="space-y-3">
          {roastResult.specificRoasts.map((roast, index) => (
            <p key={index} className="text-lg text-primary/90">
              &gt; {roast}
            </p>
          ))}
          
          <div className="mt-6 pt-4 border-t border-primary/20">
            <p className="text-lg font-medium">
              You're likely to mint a Level {nftLevel} NFT. {
                roastResult.percentageScore > 70 
                  ? "Even BitConnect victims are looking at your trades thinking 'at least I'm not that guy.'" 
                  : "There's still hope for you... barely."
              }
            </p>
          </div>
        </div>
        
        <div>
          <p className="text-lg italic text-primary/90 mb-4">{roastClosing}</p>
          
          <p className="text-lg text-foreground/90 border-t border-primary/20 pt-4 mt-4">
            Come 4/20, Brahma's onchain imprint NFT will expose the truth.
          </p>
        </div>
        
        <div className="space-y-4 pt-2">
          <div className="flex justify-center">
            <a 
              href="https://t.me/brahmanetwork" 
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 text-foreground 
                rounded-md transition-colors duration-300 font-medium"
            >
              <Bell size={18} className="text-primary" />
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
      </div>
    </div>
  );
};

export default RoastResult;
