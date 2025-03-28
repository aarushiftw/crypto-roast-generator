
import React, { useState } from 'react';
import { RoastProvider } from '@/contexts/RoastContext';
import Header from '@/components/Header';
import WelcomeScreen from '@/components/WelcomeScreen';
import QuestionContainer from '@/components/QuestionContainer';
import RoastSummaryScreen from '@/components/RoastSummaryScreen';
import { useRoast } from '@/contexts/RoastContext';

// Main app wrapper with provider
const Index = () => {
  return (
    <RoastProvider>
      <div className="min-h-screen bg-background flex flex-col items-center cyber-bg">
        <Header />
        <main className="flex-1 w-full max-w-6xl px-4 py-6 flex items-center justify-center">
          <RoastApp />
        </main>
        <footer className="py-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Brahma Network • All rights reserved</p>
        </footer>
      </div>
    </RoastProvider>
  );
};

// Inner component that uses the context
const RoastApp = () => {
  const [started, setStarted] = useState(false);
  const { isFinished } = useRoast();
  
  const handleStart = () => {
    setStarted(true);
  };
  
  return (
    <div className="w-full flex justify-center">
      {!started && <WelcomeScreen onStart={handleStart} />}
      {started && !isFinished && <QuestionContainer />}
      {started && isFinished && <RoastSummaryScreen />}
    </div>
  );
};

export default Index;
