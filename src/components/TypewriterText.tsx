
import React, { useEffect, useState } from 'react';
import { simulateTyping } from '@/lib/utils/helpers';

interface TypewriterTextProps {
  text: string;
  className?: string;
  onComplete?: () => void;
  delay?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  className = '', 
  onComplete,
  delay = 0
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const startTyping = async () => {
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      setIsTyping(true);
      await simulateTyping(text, setDisplayText, 15, 45);
      setIsTyping(false);
      
      if (onComplete) {
        timer = setTimeout(onComplete, 500);
      }
    };
    
    startTyping();
    
    return () => {
      clearTimeout(timer);
    };
  }, [text, onComplete, delay]);

  return (
    <div className={`${className} font-mono`}>
      {displayText}
      {isTyping && <span className="animate-pulse">▌</span>}
    </div>
  );
};

export default TypewriterText;
