
import React from 'react';
import { useRoast } from '@/contexts/RoastContext';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import FuckMarryKillQuestion from './FuckMarryKillQuestion';
import { QuestionData, FuckMarryKillQuestion as FMKQuestionType } from '@/lib/types/questionnaire';
import { SkipForward } from 'lucide-react';

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
        
        {/* New 3D skip-forward button */}
        <div 
          className={`button-middle button-3d ${answerSelected ? 'button-3d-active' : 'button-3d-inactive'}`} 
          onClick={handleButtonClick}
        >
          <div className="button-3d-icon">
            <SkipForward className={`h-7 w-7 text-white ${answerSelected ? 'animate-pulse-3d' : ''}`} />
          </div>
        </div>
        
        <div className="button-right invisible"></div>
      </div>
    </div>
  );
};

export default QuestionContainer;
