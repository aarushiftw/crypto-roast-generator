
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
    <div className="space-y-6">
      {!answerSelected ? (
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-primary mb-6">
            {questionText}
          </h2>
          
          <div className="grid grid-cols-1 gap-3 mt-6">
            {question.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={`py-4 px-5 text-left rounded-md border transition-colors
                  hover:bg-primary/20 hover:border-primary/50
                  bg-background border-border`}
              >
                {answer.text}
              </button>
            ))}
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
            Next Question
          </Button>
        </Card>
      )}
    </div>
  );
};

export default MultipleChoiceQuestion;
