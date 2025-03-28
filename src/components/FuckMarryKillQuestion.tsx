
import React, { useState } from 'react';
import { useRoast } from '@/contexts/RoastContext';
import { FuckMarryKillQuestion as FMKQuestionType, ActionType } from '@/lib/types/questionnaire';
import { getRandomItem } from '@/lib/utils/helpers';
import TypewriterText from './TypewriterText';
import { Button } from '@/components/ui/button';

interface FuckMarryKillQuestionProps {
  question: FMKQuestionType;
}

const FuckMarryKillQuestion: React.FC<FuckMarryKillQuestionProps> = ({ question }) => {
  const { addFMKResponse, userFMKResponses, nextQuestion, addResponse } = useRoast();
  const [responses, setResponses] = useState<{[protocol: string]: ActionType | null}>({});
  const [currentProtocolIndex, setCurrentProtocolIndex] = useState(0);
  const [showingResponse, setShowingResponse] = useState(false);
  const [responseText, setResponseText] = useState('');
  
  const currentProtocol = question.protocols[currentProtocolIndex];
  const questionText = getRandomItem(question.variations);
  const currentResponses = userFMKResponses.get(question.id) || {};
  
  const handleAction = (protocol: string, action: ActionType) => {
    if (showingResponse) return;
    
    // Update local state
    setResponses({
      ...responses,
      [protocol]: action
    });
    
    // Add to context
    addFMKResponse(protocol, action);
    
    // Get and show response text
    const responseOptions = question.responsePatterns[action][protocol];
    const response = getRandomItem(responseOptions);
    setResponseText(response);
    setShowingResponse(true);
  };
  
  const handleContinue = () => {
    setShowingResponse(false);
    
    if (currentProtocolIndex < question.protocols.length - 1) {
      // Move to next protocol
      setCurrentProtocolIndex(currentProtocolIndex + 1);
    } else {
      // All protocols answered, add full response and move to next question
      addResponse({
        questionId: question.id,
        fmkResponses: Object.entries(responses).map(([protocol, action]) => ({
          protocol,
          action: action as ActionType
        }))
      });
      nextQuestion();
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <TypewriterText 
        text={questionText} 
        className="text-xl md:text-2xl font-bold terminal-text mb-4"
      />
      
      {!showingResponse ? (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">{currentProtocol}</h3>
          
          <div className="grid grid-cols-3 gap-3">
            {(['fuck', 'marry', 'kill'] as ActionType[]).map((action) => (
              <button
                key={action}
                onClick={() => handleAction(currentProtocol, action)}
                className={`option-button flex justify-center items-center py-3 ${
                  responses[currentProtocol] === action ? 'selected' : ''
                }`}
              >
                {action.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <TypewriterText 
            text={`"${responseText}"`} 
            className="text-lg italic text-primary"
            delay={300}
            onComplete={() => setTimeout(() => {
              document.getElementById('fmk-continue-button')?.classList.remove('opacity-0');
            }, 400)}
          />
          
          <Button 
            id="fmk-continue-button"
            onClick={handleContinue} 
            className="w-full mt-4 transition-opacity duration-500 opacity-0"
          >
            {currentProtocolIndex < question.protocols.length - 1 ? 'Next Protocol' : 'Continue'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FuckMarryKillQuestion;
