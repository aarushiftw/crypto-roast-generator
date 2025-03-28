
import React from 'react';
import { useRoast } from '@/contexts/RoastContext';
import { QuestionData } from '@/lib/types/questionnaire';
import { getRandomItem } from '@/lib/utils/helpers';
import TypewriterText from './TypewriterText';
import { Button } from '@/components/ui/button';

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
      <div className="space-y-4">
        <TypewriterText 
          text={questionText} 
          className="text-xl md:text-2xl font-bold terminal-text"
        />
        
        <div className="grid grid-cols-1 gap-3 mt-6">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              disabled={answerSelected}
              className={`py-3 px-4 text-left rounded-md border transition-colors
                ${answerSelected 
                  ? 'cursor-not-allowed opacity-70' 
                  : 'cursor-pointer hover:bg-primary/20 hover:border-primary/50'}
                ${answerSelected === true && index === userResponse?.answerIndex
                  ? 'bg-[#B2F7FE] border-[#B2F7FE] text-black'
                  : 'bg-background border-border'}`}
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>

      {answerSelected && (
        <div className="mt-6 space-y-4">
          <TypewriterText 
            text={`"${responseText}"`} 
            className="text-lg italic text-primary"
            delay={500}
            onComplete={() => setTimeout(() => {
              document.getElementById('continue-button')?.classList.remove('opacity-0');
            }, 500)}
          />
          
          <Button 
            id="continue-button"
            onClick={handleContinue} 
            className="w-full mt-4 transition-opacity duration-500 opacity-0"
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default MultipleChoiceQuestion;
