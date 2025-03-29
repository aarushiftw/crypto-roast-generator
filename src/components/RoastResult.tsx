
import React, { useState, useEffect } from 'react';
import { useRoast } from '@/contexts/RoastContext';
import { 
  getRandomRoastOpening, 
  getRandomRoastReaction, 
  getRandomMidRoastReaction,
  getRandomRoastClosing 
} from '@/lib/utils/roastGenerator';
import { delay } from '@/lib/utils/helpers';
import { Share, Bell, Rocket, BarChart2, Diamond } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TypewriterText from './TypewriterText';

const RoastResult: React.FC = () => {
  const { roastResult, restartQuiz } = useRoast();
  const [displayStage, setDisplayStage] = useState(0);
  const [fullRoastComplete, setFullRoastComplete] = useState(false);
  const [nftLevel, setNftLevel] = useState(1);
  const [visibleSpecificRoasts, setVisibleSpecificRoasts] = useState<number[]>([]);
  const [glitchEffect, setGlitchEffect] = useState(false);

  const roastOpening = getRandomRoastOpening();
  const roastReaction = getRandomRoastReaction();
  const midRoastReaction = getRandomMidRoastReaction();
  const roastClosing = getRandomRoastClosing();

  // Trigger glitch effect randomly
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 150);
    }, Math.random() * 5000 + 3000);
    
    return () => clearInterval(glitchInterval);
  }, []);

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
      `I just got absolutely REKT by the Crypto Roast Bot! My Level ${nftLevel} NFT will forever mark my shame on the blockchain. NGMI. Come get rekt yourself: `
    );
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(window.location.href)}`;
    window.open(tweetUrl, '_blank');
  };

  if (!roastResult) {
    return <div>Loading your roast...</div>;
  }

  return (
    <div className={`p-6 bg-card/80 rounded-lg shadow-lg cyberpunk-border max-w-2xl w-full relative overflow-hidden ${glitchEffect ? 'animate-glitch' : ''}`}>
      {/* Animated crypto background elements */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-grid-pattern opacity-10 z-0"></div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/10 to-transparent opacity-30 z-0"></div>
      
      {/* Animated glow effect */}
      <div className="absolute inset-0 glow-effect"></div>
      
      {/* NFT Level indicator */}
      <div className="absolute -top-4 -right-4 w-28 h-28 rotate-12 z-20">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-500 rounded-lg shadow-glow animate-pulse-slow opacity-80"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Diamond className="w-8 h-8 text-white/90" />
            <span className="text-xl font-bold ml-1 text-white/90">Lvl {nftLevel}</span>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 space-y-6">
        <h2 className="text-2xl font-bold text-center neon-text mb-6 animate-glow">
          ONCHAIN VERDICT.exe
        </h2>
        
        {displayStage >= 1 && (
          <div className="animate-fade-in backdrop-blur-sm rounded-lg p-3 bg-card/40 border border-primary/30 shadow-glow-sm">
            <p className="text-lg text-primary/90">{roastOpening}</p>
            <p className="text-lg italic text-foreground/80 mt-2">{roastReaction}</p>
          </div>
        )}
        
        {displayStage >= 2 && (
          <div className="animate-fade-in backdrop-blur-sm rounded-lg p-3 bg-card/40 border border-primary/30 shadow-glow-sm">
            <p className="text-lg italic text-foreground/80 mb-3">{midRoastReaction}</p>
            <p className="text-xl font-bold cyber-text py-2 animate-pulse">{roastResult.roastLine}</p>
          </div>
        )}
        
        {displayStage >= 3 && (
          <div className="space-y-3">
            {roastResult.specificRoasts.map((roast, index) => (
              visibleSpecificRoasts.includes(index) && (
                <p key={index} className="text-lg text-primary/90 animate-fade-in flex items-center backdrop-blur-sm rounded-lg p-3 bg-card/40 border border-primary/30 shadow-glow-sm">
                  <span className="text-xl mr-2 crypto-emoji">⚡</span>
                  {roast}
                </p>
              )
            ))}
          </div>
        )}
        
        {displayStage >= 4 && (
          <div className="animate-fade-in">
            <div className="mt-6 pt-4 border-t border-primary/50 bg-gradient-to-r from-transparent via-primary/20 to-transparent">
              <div className="flex items-center mb-3">
                <BarChart2 className="w-5 h-5 text-primary mr-2" />
                <p className="text-lg font-medium">
                  Verdict: Level {nftLevel} Degen 
                  <span className="ml-2 text-sm font-mono border border-primary/50 rounded px-1 py-0.5 bg-primary/10">
                    {
                      roastResult.percentageScore > 70 
                        ? "NGMI" 
                        : roastResult.percentageScore > 40 
                          ? "WAGMI" 
                          : "HODL"
                    }
                  </span>
                </p>
              </div>
              
              <p className="text-lg font-medium crypto-gradient">
                {
                  roastResult.percentageScore > 70 
                    ? "Even BitConnect victims are looking at your trades thinking 'at least I'm not that guy.'" 
                    : "There's still hope for you... barely."
                }
              </p>
            </div>
            
            <div className="mt-4">
              <p className="text-lg italic text-primary/90 mb-4 blink-slow">{roastClosing}</p>
              
              <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-primary/30 mt-6 shadow-glow-sm">
                <p className="text-lg text-foreground/90 flex items-center">
                  <Rocket className="w-5 h-5 text-primary mr-2 animate-bounce-slow" />
                  Come 4/20, Brahma's onchain imprint NFT will expose the truth.
                </p>
              </div>
            </div>
            
            <div className="space-y-4 pt-6">
              <div className="flex justify-center">
                <a 
                  href="https://t.me/BrahmaRewards" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 text-foreground 
                    rounded-md transition-colors duration-300 font-medium border border-primary/50 hover:shadow-glow"
                >
                  <Bell size={18} className="text-primary" />
                  Remind me to mint
                </a>
              </div>
              
              <Button 
                onClick={handleShareOnTwitter}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary/80 to-purple-500/80 hover:from-primary hover:to-purple-500 text-primary-foreground border border-primary/50 shadow-glow-sm"
              >
                <Share size={18} />
                Share My Roast Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoastResult;
