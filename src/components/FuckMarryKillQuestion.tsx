
import React, { useState } from 'react';
import { useRoast } from '@/contexts/RoastContext';
import { FuckMarryKillQuestion as FMKQuestionType, ActionType } from '@/lib/types/questionnaire';
import { getRandomItem } from '@/lib/utils/helpers';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  
  const [responses, setResponses] = useState<Record<string, ActionType>>({});
  const [currentFeedback, setCurrentFeedback] = useState<string | null>(null);
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);
  
  const questionText = getRandomItem(question.variations);
  const { protocols } = question;
  
  const handleAction = (protocol: string, action: ActionType) => {
    // Skip if already selected for this protocol
    if (responses[protocol]) return;
    
    // Update local state
    const newResponses = {
      ...responses,
      [protocol]: action
    };
    setResponses(newResponses);
    
    // Add to context
    addFMKResponse(protocol, action);
    
    // Get and show response text for this action
    const responseOptions = question.responsePatterns[action][protocol];
    const response = getRandomItem(responseOptions);
    setCurrentFeedback(response);
    setSelectedProtocol(protocol);
    
    // Check if all protocols have been assigned
    const allSelected = protocols.every(p => newResponses[p] !== undefined);
    if (allSelected) {
      setAnswerSelected(true);
    }
  };
  
  const handleSubmit = () => {
    // Add full response and move to next question
    addResponse({
      questionId: question.id,
      fmkResponses: Object.entries(responses).map(([protocol, action]) => ({
        protocol,
        action
      }))
    });
    nextQuestion();
  };
  
  // Helper to check if a specific action is selected for a protocol
  const isActionSelected = (protocol: string, action: ActionType) => {
    return responses[protocol] === action;
  };
  
  // Count number of each action used
  const actionCounts = {
    fuck: Object.values(responses).filter(a => a === 'fuck').length,
    marry: Object.values(responses).filter(a => a === 'marry').length,
    kill: Object.values(responses).filter(a => a === 'kill').length
  };
  
  return (
    <ScrollArea className="h-[550px] animate-fade-in pr-4">
      <div className="space-y-5">
        <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">
          {questionText.replace("Let's play Fuck, Marry, Kill with these protocols:", "Fuck, Marry or Kill").replace("Let's, play fuck marry or kill with these protocols", "Fuck, Marry or Kill")}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {protocols.map((protocol) => (
            <Card 
              key={protocol} 
              className={`transition-all duration-300 ${
                responses[protocol] 
                  ? 'border-primary/50 bg-primary/5' 
                  : selectedProtocol === protocol 
                    ? 'border-primary/30 ring-1 ring-primary/30' 
                    : 'bg-card/50'
              } overflow-hidden`}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">{protocol}</h3>
                  {responses[protocol] && (
                    <Badge variant="outline" className="uppercase bg-primary/20 text-primary">{responses[protocol]}</Badge>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  {(['fuck', 'marry', 'kill'] as ActionType[]).map((action) => (
                    <button
                      key={`${protocol}-${action}`}
                      onClick={() => handleAction(protocol, action)}
                      className={`flex-1 py-3 px-2 rounded-md border transition-all duration-300 uppercase font-medium text-sm
                        ${isActionSelected(protocol, action) 
                          ? 'bg-primary/30 border-primary text-foreground' 
                          : responses[protocol] 
                            ? 'opacity-40 cursor-not-allowed' 
                            : 'bg-card/30 border-border hover:bg-primary/20 hover:border-primary/50'}`}
                      disabled={responses[protocol] !== undefined}
                    >
                      {action}
                    </button>
                  ))}
                </div>
                
                {/* Show feedback directly below the protocol it's related to */}
                {currentFeedback && selectedProtocol === protocol && (
                  <div className="mt-3 p-3 bg-card/80 border border-primary/20 rounded-md animate-fade-in">
                    <p className="text-sm text-primary/90">{currentFeedback}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
        
        {/* Overall insights section at the bottom */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-3">
            {['fuck', 'marry', 'kill'].map(action => (
              <Badge key={action} variant="outline" className="uppercase">
                {action}: {actionCounts[action as ActionType]}/3
              </Badge>
            ))}
          </div>
        </div>
        
        {answerSelected && (
          <div className="mt-4 animate-fade-in">
            <Button 
              onClick={handleSubmit} 
              className="w-full bg-primary/80 hover:bg-primary text-primary-foreground"
            >
              Continue to Next Question
            </Button>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default FuckMarryKillQuestion;
