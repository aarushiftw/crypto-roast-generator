
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
      
      // Display stages sequentially with 1.5-second gaps
      setDisplayStage(1);
      await delay(1500);
      
      // After opening and reaction, show main roast line
      setDisplayStage(2);
      await delay(1500);
      
      // After main roast, show specific roasts one by one
      setDisplayStage(3);
      
      for (let i = 0; i < roastResult.specificRoasts.length; i++) {
        await delay(1500);
        setVisibleSpecificRoasts(prev => [...prev, i]);
      }
      
      // Show final section
      await delay(1500);
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
        <div className="screen-inner space-y-6">
          <h2 className="text-2xl font-bold text-center gradient-text mb-6">
            YOUR ONCHAIN VERDICT
          </h2>
          
          {displayStage >= 1 && (
            <div className="animate-fade-in">
              <p className="text-lg text-primary/90">{roastOpening}</p>
              <p className="text-lg italic text-foreground/80 mt-2">{roastReaction}</p>
            </div>
          )}
          
          {displayStage >= 2 && (
            <div className="animate-fade-in">
              <p className="text-lg italic text-foreground/80 mb-3">{midRoastReaction}</p>
              <p className="text-xl font-bold terminal-text py-2">{roastResult.roastLine}</p>
            </div>
          )}
          
          {displayStage >= 3 && (
            <div className="space-y-3">
              {roastResult.specificRoasts.map((roast, index) => (
                visibleSpecificRoasts.includes(index) && (
                  <p key={index} className="text-lg text-primary/90 animate-fade-in">
                    &gt; {roast}
                  </p>
                )
              ))}
            </div>
          )}
          
          {displayStage >= 4 && (
            <div className="animate-fade-in">
              <div className="mt-6 pt-4 border-t border-primary/20">
                <p className="text-lg font-medium">
                  You're likely to mint a Level {nftLevel} NFT. {
                    roastResult.percentageScore > 70 
                      ? "Even BitConnect victims are looking at your trades thinking 'at least I'm not that guy.'" 
                      : "There's still hope for you... barely."
                  }
                </p>
              </div>
              
              <div>
                <p className="text-lg italic text-primary/90 mb-4 mt-4">{roastClosing}</p>
                
                <p className="text-lg text-foreground/90 border-t border-primary/20 pt-4 mt-4">
                  Come 4/20, Brahma's onchain imprint NFT will expose the truth.
                </p>
              </div>
              
              <div className="space-y-4 pt-4">
                <div className="flex justify-center">
                  <a 
                    href="https://t.me/BrahmaRewards" 
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 text-foreground 
                      rounded-md transition-colors duration-300 font-medium"
                  >
                    <Bot size={18} className="text-primary" />
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
