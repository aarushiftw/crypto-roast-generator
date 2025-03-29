import React, { useState, useEffect } from 'react';
import { useRoast } from '@/contexts/RoastContext';
import { 
  getRandomRoastOpening, 
  getRandomRoastReaction, 
  getRandomMidRoastReaction,
  getRandomRoastClosing,
  getRandomTraitDescriptor
} from '@/lib/utils/roastGenerator';
import { delay } from '@/lib/utils/helpers';
import { Share, Bot, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TypewriterText from './TypewriterText';
import { ScrollArea } from '@/components/ui/scroll-area';

const RoastResult: React.FC = () => {
  const { roastResult, restartQuiz } = useRoast();
  const [displayStage, setDisplayStage] = useState(0);
  const [fullRoastComplete, setFullRoastComplete] = useState(false);
  const [nftLevel, setNftLevel] = useState(1);
  const [visibleSpecificRoasts, setVisibleSpecificRoasts] = useState<number[]>([]);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [traitDescriptors, setTraitDescriptors] = useState<{
    risk: string;
    portfolio: string;
    technical: string;
  }>({
    risk: '',
    portfolio: '',
    technical: ''
  });

  const roastOpening = getRandomRoastOpening();
  const roastReaction = getRandomRoastReaction();
  const midRoastReaction = getRandomMidRoastReaction();
  const roastClosing = getRandomRoastClosing();

  // NFT level descriptions based on specific requirements
  const nftLevelDescriptions = [
    "", // No level 0
    "Crypto Curious: Just starting your journey", 
    "Crypto Enthusiast: Making progress but still learning",
    "Crypto Degenerate: Deep in the rabbit hole",
    "Crypto Veteran: Experienced but with questionable choices"
  ];

  useEffect(() => {
    const advanceStage = async () => {
      if (!roastResult) return;

      // Calculate NFT level (1-4) based on percentage score
      const level = Math.min(4, Math.max(1, Math.ceil(roastResult.percentageScore / 25)));
      setNftLevel(level);
      
      // Generate trait descriptors
      setTraitDescriptors({
        risk: getRandomTraitDescriptor('risk-taking'),
        portfolio: getRandomTraitDescriptor('portfolio-management'),
        technical: getRandomTraitDescriptor('technical-skills')
      });
      
      // Display stages sequentially with 1.5-second gaps
      setDisplayStage(1);
      await delay(1500);
      
      // After opening and reaction, show main roast line
      setDisplayStage(2);
      await delay(1500);
      
      // After main roast, show specific roasts one by one (all of them)
      setDisplayStage(3);
      
      for (let i = 0; i < roastResult.specificRoasts.length; i++) {
        await delay(1500);
        setVisibleSpecificRoasts(prev => [...prev, i]);
      }
      
      // Show final section
      await delay(1500);
      setDisplayStage(4);
      setFullRoastComplete(true);
      
      // Hide scroll indicator after a delay
      setTimeout(() => {
        setShowScrollIndicator(false);
      }, 5000);
    };
    
    advanceStage();
  }, [roastResult]);

  const handleShareOnTwitter = () => {
    if (!roastResult) return;
    
    const tweetText = encodeURIComponent(
      `I just got absolutely destroyed by the Crypto Roast Bot! I'm a Level ${nftLevel} crypto degenerate (${nftLevelDescriptions[nftLevel]}). 4/20: Brahma's NFT will expose the truth. #BrahmaRoast`
    );
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(window.location.href)}`;
    window.open(tweetUrl, '_blank');
  };

  if (!roastResult) {
    return <div>Loading your roast...</div>;
  }

  return (
    <div className="tamagotchi-container">
      <div className="tamagotchi-top-lights">
        <div className="light light-left"></div>
        <div className="light light-right"></div>
      </div>
      
      <div className="tamagotchi-screen">
        <ScrollArea className="h-[500px] w-full">
          <div className="screen-inner space-y-6 p-6">
            <h2 className="text-xl font-bold text-center gradient-text mb-4">
              YOUR ONCHAIN VERDICT
            </h2>
            
            {showScrollIndicator && (
              <div className="absolute bottom-4 right-4 animate-bounce text-primary/70">
                <ArrowDown size={20} />
              </div>
            )}
            
            {displayStage >= 1 && (
              <div className="animate-fade-in">
                <p className="text-primary/90">{roastOpening}</p>
                <p className="italic text-foreground/80 mt-2">{roastReaction}</p>
              </div>
            )}
            
            {displayStage >= 2 && (
              <div className="animate-fade-in mt-4">
                <p className="italic text-foreground/80 mb-3">{midRoastReaction}</p>
                <p className="font-bold terminal-text py-2 px-2 border border-primary/30 rounded-md bg-background/50">
                  {roastResult.roastLine}
                </p>
              </div>
            )}
            
            {displayStage >= 3 && (
              <div className="space-y-3 mt-4">
                {roastResult.specificRoasts.map((roast, index) => (
                  visibleSpecificRoasts.includes(index) && (
                    <p key={index} className="text-primary/90 animate-fade-in">
                      &gt; {roast}
                    </p>
                  )
                ))}
              </div>
            )}
            
            {displayStage >= 4 && (
              <div className="animate-fade-in mt-6 space-y-4">
                <div className="pt-3 border-t border-primary/20">
                  <p className="font-medium text-lg">
                    Based on your traits, you're most likely a <span className="text-primary">Level {nftLevel}</span> crypto degenerate
                  </p>
                  <p className="mt-2 text-foreground/80">
                    You're likely to mint a Level {nftLevel} NFT when Brahma's drop happens: {nftLevelDescriptions[nftLevel]}
                  </p>
                </div>
                
                {/* Trait descriptors section - removed trait names */}
                <div className="mt-4 space-y-2 bg-primary/5 p-3 rounded-md">
                  <p className="text-sm text-primary/80 font-medium">Your Trait Analysis:</p>
                  <p className="text-sm">• <span className="italic text-foreground/80">{traitDescriptors.risk}</span></p>
                  <p className="text-sm">• <span className="italic text-foreground/80">{traitDescriptors.portfolio}</span></p>
                  <p className="text-sm">• <span className="italic text-foreground/80">{traitDescriptors.technical}</span></p>
                </div>
                
                <div className="mt-4">
                  <p className="italic text-primary/90 mb-3">{roastClosing}</p>
                  
                  <div className="flex flex-col items-center border-t border-primary/20 pt-3 mt-3">
                    <p className="text-foreground/90 font-medium text-center">
                      4/20: Brahma's NFT will expose the truth
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 pt-3 pb-6">
                  <div className="flex justify-center">
                    <a 
                      href="https://t.me/BrahmaRewards" 
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground 
                        rounded-md transition-colors duration-300 font-medium text-sm"
                    >
                      <Bot size={16} className="text-primary" />
                      Remind me to mint
                    </a>
                  </div>
                  
                  <Button 
                    onClick={handleShareOnTwitter}
                    className="w-full flex items-center justify-center gap-2 bg-primary/80 hover:bg-primary text-primary-foreground text-sm py-2"
                    size="sm"
                  >
                    <Share size={16} />
                    Share My Roast
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
      
      <div className="tamagotchi-buttons">
        <div className="button-left"></div>
        <div 
          className="button-middle" 
          onClick={restartQuiz}
          title="Start a new roast"
        ></div>
        <div className="button-right"></div>
      </div>
    </div>
  );
};

export default RoastResult;
