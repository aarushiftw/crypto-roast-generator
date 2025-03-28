
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
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">
        {questionText.replace("Let's play Fuck, Marry, Kill with these protocols:", "Fuck, Marry or Kill").replace("Let's, play fuck marry or kill with these protocols", "Fuck, Marry or Kill")}
      </h2>
      
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4 text-foreground/90">{currentProtocol}</h3>
        
        <div className="grid grid-cols-3 gap-3">
          {(['fuck', 'marry', 'kill'] as ActionType[]).map((action) => (
            <button
              key={action}
              onClick={() => handleAction(currentProtocol, action)}
              className={`py-4 px-3 text-center rounded-md border hover:bg-primary/20 hover:border-primary/50 
                transition-all duration-300 uppercase font-medium bg-card/30 border-border
                ${answerSelected && responses[currentProtocol] === action ? 'bg-primary/30 border-primary' : ''}`}
              disabled={answerSelected}
            >
              {action}
            </button>
          ))}
        </div>
      </div>
      
      {answerSelected && (
        <div className="mt-4 animate-fade-in">
          <Card className="p-4 border-primary/30 bg-card/80">
            <h3 className="text-lg font-semibold mb-2 text-primary">Insight</h3>
            <p className="text-md text-primary/90 mb-4">{responseText}</p>
            
            <Button 
              onClick={handleContinue} 
              className="w-full mt-2 bg-primary/80 hover:bg-primary text-primary-foreground"
            >
              {currentProtocolIndex < question.protocols.length - 1 ? 'Next Protocol' : 'Next Question'}
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FuckMarryKillQuestion;
