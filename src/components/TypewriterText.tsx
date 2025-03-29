
import React, { useEffect, useState, useRef } from 'react';
import { simulateTyping } from '@/lib/utils/helpers';

interface TypewriterTextProps {
  text: string;
  className?: string;
  onComplete?: () => void;
  delay?: number;
  typingSpeed?: number;
  loop?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  className = '', 
  onComplete,
  delay = 0,
  typingSpeed = 30,
  loop = false
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const startTyping = async () => {
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      // Only start typing if not already completed (prevents looping)
      if (!typingComplete || loop) {
        setIsTyping(true);
        // Clear any previous text before starting to type
        setDisplayText('');
        await simulateTyping(text, setDisplayText, typingSpeed, typingSpeed * 1.5);
        setIsTyping(false);
        setTypingComplete(true);
        
        if (onComplete) {
          timer = setTimeout(onComplete, 500);
        }
      }
    };
    
    startTyping();
    
    return () => {
      clearTimeout(timer);
    };
  }, [text, onComplete, delay, typingSpeed, loop, typingComplete]);

  // Handle line breaks and preserve proper scrolling
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayText]);

  // Process text with proper line breaks for display
  const processedText = displayText.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < displayText.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div 
      ref={containerRef}
      className={`${className} font-mono max-h-48 overflow-y-auto transition-all duration-200`}
    >
      {processedText}
      {isTyping && <span className="typing-cursor opacity-70">▌</span>}
    </div>
  );
};

export default TypewriterText;
