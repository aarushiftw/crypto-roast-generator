
import React, { useState } from 'react';
import { useRoast } from '@/contexts/RoastContext';
import { FuckMarryKillQuestion as FMKQuestionType, ActionType } from '@/lib/types/questionnaire';
import { getRandomItem } from '@/lib/utils/helpers';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FuckMarryKillQuestionProps {
  question: FMKQuestionType;
}

const FuckMarryKillQuestion: React.FC<FuckMarryKillQuestionProps> = ({ question }) => {
  const { 
    addFMKResponse, 
    userFMKResponses, 
    nextQuestion, 
    addResponse,
    responseText, 
    setResponseText,
    answerSelected, 
    setAnswerSelected 
  } = useRoast();
  
  const [responses, setResponses] = useState<{[protocol: string]: ActionType | null}>({});
  const [currentProtocolIndex, setCurrentProtocolIndex] = useState(0);
  
  const currentProtocol = question.protocols[currentProtocolIndex];
  const questionText = getRandomItem(question.variations);
  
  const handleAction = (protocol: string, action: ActionType) => {
    if (answerSelected) return;
    
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
    setAnswerSelected(true);
  };
  
  const handleContinue = () => {
    if (currentProtocolIndex < question.protocols.length - 1) {
      // Move to next protocol
      setCurrentProtocolIndex(currentProtocolIndex + 1);
      setAnswerSelected(false);
      setResponseText('');
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
    <div className="space-y-6">
      {!answerSelected ? (
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">
            {questionText}
          </h2>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">{currentProtocol}</h3>
            
            <div className="grid grid-cols-3 gap-3">
              {(['fuck', 'marry', 'kill'] as ActionType[]).map((action) => (
                <button
                  key={action}
                  onClick={() => handleAction(currentProtocol, action)}
                  className="py-4 px-3 text-center rounded-md border hover:bg-primary/20 hover:border-primary/50 transition-colors uppercase font-medium"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Card className="p-6 border-primary/30 animate-fade-in">
          <h3 className="text-lg font-semibold mb-4">Analysis</h3>
          <p className="text-lg italic text-primary mb-6">"{responseText}"</p>
          
          <Button 
            onClick={handleContinue} 
            className="w-full mt-2"
          >
            {currentProtocolIndex < question.protocols.length - 1 ? 'Next Protocol' : 'Next Question'}
          </Button>
        </Card>
      )}
    </div>
  );
};

export default FuckMarryKillQuestion;
