
import React from 'react';
import { useRoast } from '@/contexts/RoastContext';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import FuckMarryKillQuestion from './FuckMarryKillQuestion';
import { QuestionData, FuckMarryKillQuestion as FMKQuestionType } from '@/lib/types/questionnaire';
import { ArrowRight } from 'lucide-react';

const QuestionContainer: React.FC = () => {
  const { 
    currentQuestion, 
    currentQuestionIndex, 
    totalQuestions,
    nextQuestion,
    answerSelected
  } = useRoast();

  const handleButtonClick = () => {
    if (answerSelected) {
      nextQuestion();
    }
  };

  if (!currentQuestion) {
    return <div className="tamagotchi-container">
      <div className="tamagotchi-screen flex items-center justify-center">
        <p className="text-center">Loading next question...</p>
      </div>
    </div>;
  }

  return (
    <div className="tamagotchi-container">
      <div className="tamagotchi-top-lights">
        <div className="light light-left"></div>
        <div className="light light-right"></div>
      </div>
      
      <div className="tamagotchi-screen">
        <div className="screen-inner pt-4 pb-2 px-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-primary font-medium">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>

          {currentQuestion.type === 'multiple_choice' ? (
            <MultipleChoiceQuestion question={currentQuestion as QuestionData} />
          ) : currentQuestion.type === 'fuck_marry_kill' ? (
            <FuckMarryKillQuestion question={currentQuestion as FMKQuestionType} />
          ) : (
            <div>Unknown question type</div>
          )}
        </div>
      </div>
      
      <div className="tamagotchi-buttons">
        {/* Remove left and right button functionality */}
        <div className="button-left invisible"></div>
        
        {/* Add indicator to the middle button when answer is selected */}
        <div 
          className={`button-middle relative ${answerSelected ? 'active-button' : 'inactive-button'}`} 
          onClick={handleButtonClick}
        >
          {answerSelected && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-white px-2 py-1 rounded text-xs whitespace-nowrap">
              Click to continue <ArrowRight className="inline h-3 w-3 ml-1" />
            </div>
          )}
        </div>
        
        <div className="button-right invisible"></div>
      </div>
      
      <style jsx>{`
        .active-button {
          box-shadow: 0 0 10px #38bdf8;
          animation: pulse 1.5s infinite;
        }
        
        .inactive-button {
          opacity: 0.7;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 5px #38bdf8;
          }
          50% {
            box-shadow: 0 0 15px #38bdf8, 0 0 20px #38bdf8;
          }
          100% {
            box-shadow: 0 0 5px #38bdf8;
          }
        }
      `}</style>
    </div>
  );
};

export default QuestionContainer;
