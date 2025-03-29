
import React from 'react';
import { useRoast } from '@/contexts/RoastContext';
import { QuestionData } from '@/lib/types/questionnaire';
import { getRandomItem } from '@/lib/utils/helpers';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MultipleChoiceQuestionProps {
  question: QuestionData;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ question }) => {
  const { 
    addResponse, 
    nextQuestion, 
    answerSelected, 
    setAnswerSelected, 
    responseText, 
    setResponseText 
  } = useRoast();

  const handleSelectAnswer = (index: number) => {
    if (answerSelected) return; // Prevent multiple selections
    
    setAnswerSelected(true);
    const selectedAnswer = question.answers[index];
    const response = getRandomItem(selectedAnswer.responses);
    setResponseText(response);
    
    // Record the user's response
    addResponse({
      questionId: question.id,
      answerIndex: index,
    });
  };

  const handleContinue = () => {
    nextQuestion();
  };

  const questionText = getRandomItem(question.variations);

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">
        {questionText}
      </h2>
      
      {!answerSelected ? (
        <div className="grid grid-cols-1 gap-3 mt-4">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              className="py-4 px-5 text-left rounded-md border transition-colors duration-300
                hover:bg-primary/20 hover:border-primary/50 hover:translate-x-1
                bg-card/30 border-border"
            >
              {answer.text}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <Card className="p-6 border-primary/30 animate-slide-up bg-card/80">
            <h3 className="text-lg font-semibold mb-4 text-primary">Insight</h3>
            <p className="text-lg text-primary/90 mb-4">{responseText}</p>
            
            <Button 
              onClick={handleContinue} 
              className="w-full mt-2 bg-primary/80 hover:bg-primary text-primary-foreground"
            >
              Next Question
            </Button>
          </Card>
        </div>
      )}
      
      {/* Neon grid lines */}
      <div className="absolute inset-x-0 bottom-0 h-20 neon-grid z-0"></div>
    </div>
  );
};

export default MultipleChoiceQuestion;
