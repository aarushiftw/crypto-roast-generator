
import React, { useState } from 'react';
import { useRoast } from '@/contexts/RoastContext';
import { FuckMarryKillQuestion as FMKQuestionType, ActionType } from '@/lib/types/questionnaire';
import { getRandomItem } from '@/lib/utils/helpers';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FuckMarryKillQuestionProps {
  question: FMKQuestionType;
}

const FuckMarryKillQuestion: React.FC<FuckMarryKillQuestionProps> = ({ question }) => {
  const { 
    addFMKResponse, 
    userFMKResponses, 
    nextQuestion, 
    addResponse,
    setResponseText,
    answerSelected, 
    setAnswerSelected 
  } = useRoast();
  
  const [responses, setResponses] = useState<Record<string, ActionType>>({});
  const [insights, setInsights] = useState<Record<string, string>>({});
  
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
    
    // Get and store response text for this action
    const responseOptions = question.responsePatterns[action][protocol];
    const response = getRandomItem(responseOptions);
    setInsights(prev => ({...prev, [protocol]: response}));
    
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
    <div className="space-y-6 animate-fade-in relative">
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">
        {questionText.replace("Let's play Fuck, Marry, Kill with these protocols:", "Fuck, Marry or Kill").replace("Let's, play fuck marry or kill with these protocols", "Fuck, Marry or Kill")}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {(['fuck', 'marry', 'kill'] as ActionType[]).map((action) => (
          <div key={action} className="text-center">
            <h3 className="uppercase font-bold text-primary mb-2">{action}</h3>
            <div className="bg-secondary/30 h-16 rounded-md flex items-center justify-center">
              {actionCounts[action] > 0 ? (
                <div className="font-medium text-lg">
                  {Object.entries(responses)
                    .filter(([_, a]) => a === action)
                    .map(([p]) => p)
                    .join(', ')}
                </div>
              ) : (
                <div className="text-muted-foreground italic">Choose below</div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-4">
        {protocols.map((protocol) => (
          <Card key={protocol} className={`p-4 transition-all duration-300 ${responses[protocol] ? 'border-primary/50 bg-primary/5' : 'bg-card/50'}`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{protocol}</h3>
              {responses[protocol] && (
                <Badge variant="outline" className="uppercase bg-primary/20 text-primary">{responses[protocol]}</Badge>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {(['fuck', 'marry', 'kill'] as ActionType[]).map((action) => (
                <button
                  key={`${protocol}-${action}`}
                  onClick={() => handleAction(protocol, action)}
                  className={`py-3 px-2 rounded-md border transition-all duration-300 uppercase font-medium
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
          </Card>
        ))}
      </div>
      
      {answerSelected && Object.keys(insights).length > 0 && (
        <div className="mt-4 space-y-4">
          <h3 className="text-lg font-semibold text-primary">Insights</h3>
          {Object.entries(insights).map(([protocol, insight]) => (
            <Card key={protocol} className="p-4 border-primary/30 bg-card/80">
              <p className="text-md text-primary/90">
                <strong>{protocol}</strong>: {insight}
              </p>
            </Card>
          ))}
          
          <Button 
            onClick={handleSubmit} 
            className="w-full bg-primary/80 hover:bg-primary text-primary-foreground"
          >
            Continue to Next Question
          </Button>
        </div>
      )}
      
      {/* Neon grid lines */}
      <div className="absolute inset-x-0 bottom-0 h-20 neon-grid z-0"></div>
    </div>
  );
};

export default FuckMarryKillQuestion;
