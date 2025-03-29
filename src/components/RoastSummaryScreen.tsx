
import React, { useEffect, useState } from 'react';
import { useRoast } from '@/contexts/RoastContext';
import { generateRoastResult } from '@/lib/utils/roastGenerator';
import LoadingScreen from './LoadingScreen';
import RoastResult from './RoastResult';

const RoastSummaryScreen: React.FC = () => {
  const { userResponses, traitScores, setRoastResult } = useRoast();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  useEffect(() => {
    // Create a smoother loading experience with progressive steps
    const generateResult = async () => {
      // Start the loading progress
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 90 ? 90 : newProgress; // Cap at 90% until actually complete
        });
      }, 300);
      
      // Generate the roast result - but explicitly avoid wallet scanning references
      const result = generateRoastResult(userResponses, traitScores);
      
      // Add a minimum loading time to prevent flashing
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Finish the loading progress
      clearInterval(progressInterval);
      setLoadingProgress(100);
      
      // Update the context with the result
      setRoastResult(result);
      
      // Add a brief delay after reaching 100% before showing results
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };
    
    generateResult();
  }, [userResponses, traitScores, setRoastResult]);
  
  if (isLoading) {
    return <LoadingScreen progress={loadingProgress} />;
  }
  
  return <RoastResult />;
};

export default RoastSummaryScreen;
