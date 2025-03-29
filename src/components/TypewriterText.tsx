
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
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  
  // Reset the component when the text changes
  useEffect(() => {
    setTypingComplete(false);
    setDisplayText('');
    
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [text]);
  
  useEffect(() => {
    let mounted = true;
    
    const startTyping = async () => {
      if (delay > 0) {
        await new Promise(resolve => {
          animationRef.current = setTimeout(resolve, delay);
        });
      }
      
      // Only start typing if component is still mounted
      if (!mounted) return;
      
      if (!typingComplete || loop) {
        setIsTyping(true);
        setDisplayText('');
        
        // Use a more controlled typing animation
        let currentText = '';
        
        for (let i = 0; i < text.length; i++) {
          if (!mounted) break;
          
          currentText += text[i];
          setDisplayText(currentText);
          
          // More consistent typing timing
          const typingDelay = Math.floor(Math.random() * (typingSpeed * 0.4)) + typingSpeed * 0.8;
          await new Promise(resolve => {
            animationRef.current = setTimeout(resolve, typingDelay);
          });
        }
        
        if (mounted) {
          setIsTyping(false);
          setTypingComplete(true);
          
          if (onComplete) {
            animationRef.current = setTimeout(onComplete, 500);
          }
        }
      }
    };
    
    startTyping();
    
    return () => {
      mounted = false;
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [text, onComplete, delay, typingSpeed, loop, typingComplete]);

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
      className={`${className} font-mono overflow-hidden transition-all duration-200`}
    >
      {processedText}
      {isTyping && <span className="typing-cursor opacity-80">▌</span>}
    </div>
  );
};

export default TypewriterText;
