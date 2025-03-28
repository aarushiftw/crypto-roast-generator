
import React, { useState } from 'react';
import { useRoast } from '@/contexts/RoastContext';
import { QuestionData } from '@/lib/types/questionnaire';
import { getRandomItem } from '@/lib/utils/helpers';
import TypewriterText from './TypewriterText';
import { Button } from '@/components/ui/button';

interface MultipleChoiceQuestionProps {
  question: QuestionData;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ question }) => {
  const { addResponse, nextQuestion } = useRoast();
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  const [responseText, setResponseText] = useState('');

  const handleSelectAnswer = (index: number) => {
    if (selectedAnswerIndex !== null) return; // Prevent multiple selections
    
    setSelectedAnswerIndex(index);
    const selectedAnswer = question.answers[index];
    const response = getRandomItem(selectedAnswer.responses);
    setResponseText(response);
    
    // Record the user's response
    addResponse({
      questionId: question.id,
      answerIndex: index,
    });
    
    // Show the witty response
    setShowResponse(true);
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
              disabled={selectedAnswerIndex !== null}
              className={`option-button ${selectedAnswerIndex === index ? 'selected' : ''}`}
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>

      {showResponse && (
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
