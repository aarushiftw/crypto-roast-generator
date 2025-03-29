
import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import { getRandomItem } from '@/lib/utils/helpers';
import { roastFlow } from '@/lib/data/questions';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

interface LoadingScreenProps {
  progress?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress = 0 }) => {
  // Get a random loading message
  const [loadingMessage, setLoadingMessage] = useState(getRandomItem(roastFlow.openings));
  const [showRedirectNotice, setShowRedirectNotice] = useState(false);
  
  // Update loading message occasionally
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingMessage(getRandomItem(roastFlow.openings));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    // Show redirect notice after 10 seconds
    const noticeTimer = setTimeout(() => {
      setShowRedirectNotice(true);
      toast({
        title: "Redirecting soon...",
        description: "You'll be redirected to Brahma.fi in 5 seconds.",
        duration: 5000,
      });
    }, 10000);
    
    // Redirect after 15 seconds
    const redirectTimer = setTimeout(() => {
      window.location.href = "https://brahma.fi";
    }, 15000);
    
    return () => {
      clearTimeout(noticeTimer);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 relative">
      <Loader className="h-12 w-12 animate-spin text-[#B2F7FE] mb-6" />
      
      <div className="w-full max-w-md mb-6">
        <Progress value={progress} className="h-2 bg-gray-700" />
        <p className="text-xs text-muted-foreground mt-1 text-right">{Math.round(progress)}%</p>
      </div>
      
      <p className="mt-2 text-lg font-medium terminal-text text-center">{loadingMessage}</p>
      <p className="mt-3 text-sm text-primary/70">Analyzing your responses...</p>
      
      {showRedirectNotice && (
        <div className="mt-6 animate-fade-in text-center">
          <p className="text-sm text-muted-foreground">Redirecting to Brahma.fi...</p>
        </div>
      )}
      
      {/* Cyberpunk grid lines */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-grid-pattern opacity-10 z-0"></div>
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-primary/10 to-transparent opacity-30 z-0"></div>
    </div>
  );
};

export default LoadingScreen;
