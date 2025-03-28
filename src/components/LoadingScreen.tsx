
import React from 'react';
import { Loader } from 'lucide-react';
import { getRandomItem } from '@/lib/utils/helpers';
import { roastFlow } from '@/lib/data/questions';

const LoadingScreen: React.FC = () => {
  // Get a random loading message
  const loadingMessage = getRandomItem(roastFlow.openings);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader className="h-12 w-12 animate-spin text-[#B2F7FE]" />
      <p className="mt-4 text-lg font-medium terminal-text">{loadingMessage}</p>
    </div>
  );
};

export default LoadingScreen;
