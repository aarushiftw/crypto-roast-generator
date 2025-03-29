
import React, { useState, useRef, useEffect } from 'react';
import { useRoast } from '@/contexts/RoastContext';
import { FuckMarryKillQuestion as FMKQuestionType, ActionType } from '@/lib/types/questionnaire';
import { getRandomItem } from '@/lib/utils/helpers';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
  const [protocolFeedback, setProtocolFeedback] = useState<Record<string, string>>({});
  const [insightText, setInsightText] = useState<string>("");
  const insightRef = useRef<HTMLDivElement>(null);
  
  const questionText = getRandomItem(question.variations);
  const { protocols } = question;
  
  useEffect(() => {
    if (answerSelected) {
      // Scroll to insight with a slight delay to ensure it renders first
      setTimeout(() => {
        if (insightRef.current) {
          insightRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [answerSelected]);
  
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
    
    // Store feedback for this specific protocol
    setProtocolFeedback({
      ...protocolFeedback,
      [protocol]: response
    });
    
    // Check if all protocols have been assigned
    const allSelected = protocols.every(p => newResponses[p] !== undefined);
    if (allSelected) {
      // Generate an overall insight by combining individual feedbacks
      const overallInsight = Object.values(protocolFeedback).join(' ');
      setInsightText(overallInsight);
      setAnswerSelected(true);
      
      // Auto-submit after slight delay when all are selected
      setTimeout(() => {
        addResponse({
          questionId: question.id,
          fmkResponses: Object.entries(newResponses).map(([protocol, action]) => ({
            protocol,
            action
          }))
        });
      }, 1500);
    }
  };
  
  // Helper to check if a specific action is selected for a protocol
  const isActionSelected = (protocol: string, action: ActionType) => {
    return responses[protocol] === action;
  };

  return (
    <ScrollArea className="h-[550px] pr-2">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-primary mb-3">
          {questionText.replace("Let's play Fuck, Marry, Kill with these protocols:", "Fuck, Marry or Kill").replace("Let's, play fuck marry or kill with these protocols", "Fuck, Marry or Kill")}
        </h2>
        
        <div className="space-y-4">
          {protocols.map((protocol) => (
            <Card 
              key={protocol} 
              className={`transition-all duration-300 ${
                responses[protocol] 
                  ? 'border-primary/50 bg-primary/5' 
                  : 'bg-card/50 hover:bg-card/70'
              } overflow-hidden`}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">{protocol}</h3>
                  {responses[protocol] && (
                    <div className="uppercase bg-primary/20 text-primary font-medium px-2 py-1 rounded-md">
                      {responses[protocol]}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {(['fuck', 'marry', 'kill'] as ActionType[]).map((action) => (
                    <button
                      key={`${protocol}-${action}`}
                      onClick={() => handleAction(protocol, action)}
                      className={`py-3 px-1 rounded-md border transition-all duration-300 uppercase font-medium text-sm
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
                
                {/* Show feedback below each protocol card when available */}
                {protocolFeedback[protocol] && (
                  <div className="mt-3 p-3 bg-card/80 border border-primary/20 rounded-md animate-fade-in">
                    <p className="text-sm text-primary/90">{protocolFeedback[protocol]}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default FuckMarryKillQuestion;
