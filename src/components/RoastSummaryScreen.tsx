
import React, { useEffect, useState } from 'react';
import { useRoast } from '@/contexts/RoastContext';
import { generateRoastResult } from '@/lib/utils/roastGenerator';
import LoadingScreen from './LoadingScreen';
import RoastResult from './RoastResult';

const RoastSummaryScreen: React.FC = () => {
  const { userResponses, traitScores, setRoastResult } = useRoast();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const generateResult = async () => {
      // Simulate a calculation period but not too long
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Generate the roast result - but don't include wallet scanning references
      const result = generateRoastResult(userResponses, traitScores);
      
      // Update the context with the result
      setRoastResult(result);
      
      // Complete loading
      setIsLoading(false);
    };
    
    generateResult();
  }, [userResponses, traitScores, setRoastResult]);
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return <RoastResult />;
};

export default RoastSummaryScreen;
