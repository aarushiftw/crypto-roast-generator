
import React from 'react';
import { Loader } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-lg font-medium terminal-text">Scanning blockchain for poor decisions...</p>
    </div>
  );
};

export default LoadingScreen;
