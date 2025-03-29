
import React from 'react';
import { useRoast } from '@/contexts/RoastContext';
import { QuestionData } from '@/lib/types/questionnaire';
import { getRandomItem } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/card';

interface MultipleChoiceQuestionProps {
  question: QuestionData;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ question }) => {
  const { 
    addResponse, 
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

  const questionText = getRandomItem(question.variations);

  return (
    <div className="space-y-4 animate-fade-in">
      {!answerSelected ? (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-primary mb-3">
            {questionText}
          </h2>
          
          <div className="grid grid-cols-1 gap-2 mt-3">
            {question.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className="py-2 px-4 text-left rounded-md border transition-colors duration-300
                  hover:bg-primary/20 hover:border-primary/50 hover:translate-x-1
                  bg-card/30 border-border text-sm"
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <Card className="p-4 border-primary/30 animate-slide-up bg-card/80">
          <h3 className="text-base font-semibold mb-2 text-primary">Insight</h3>
          <p className="text-sm text-primary/90">{responseText}</p>
        </Card>
      )}
    </div>
  );
};

export default MultipleChoiceQuestion;
