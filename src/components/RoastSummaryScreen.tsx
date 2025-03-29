
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
      // Start with initial progress
      setLoadingProgress(5);
      
      // Create a smoother progressive loading animation
      const totalSteps = 20;
      const maxProgressBeforeCompletion = 95;
      const baseDelay = 150; // ms
      
      // Create an array of increasing progress points, with some randomness
      const progressPoints = Array.from({ length: totalSteps }, (_, i) => {
        const baseProgress = (i + 1) * (maxProgressBeforeCompletion / totalSteps);
        // Add some small randomness to make it look more natural
        const randomness = Math.random() * 3 - 1.5; // -1.5 to +1.5
        return Math.min(maxProgressBeforeCompletion, baseProgress + randomness);
      });
      
      // Process each progress point with a delay
      for (const progress of progressPoints) {
        await new Promise(resolve => setTimeout(resolve, baseDelay + Math.random() * 50));
        setLoadingProgress(progress);
      }
      
      // Generate the roast result - without wallet scanning references
      const result = generateRoastResult(userResponses, traitScores);
      
      // Ensure minimum loading time for UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Set to almost complete
      setLoadingProgress(98);
      
      // Update the context with the result
      setRoastResult(result);
      
      // Finish loading
      await new Promise(resolve => setTimeout(resolve, 300));
      setLoadingProgress(100);
      
      // Add a brief delay after reaching 100% before showing results
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    };
    
    generateResult();
  }, [userResponses, traitScores, setRoastResult]);
  
  if (isLoading) {
    return <LoadingScreen progress={loadingProgress} />;
  }
  
  return <RoastResult />;
};

export default RoastSummaryScreen;
