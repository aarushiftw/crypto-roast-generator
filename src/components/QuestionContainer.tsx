
import React from 'react';
import { useRoast } from '@/contexts/RoastContext';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import FuckMarryKillQuestion from './FuckMarryKillQuestion';
import { QuestionData, FuckMarryKillQuestion as FMKQuestionType } from '@/lib/types/questionnaire';

const QuestionContainer: React.FC = () => {
  const { 
    currentQuestion, 
    currentQuestionIndex, 
    totalQuestions
  } = useRoast();

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
        <div className="screen-inner">
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
        <div className="button-left"></div>
        <div className="button-middle"></div>
        <div className="button-right"></div>
      </div>
    </div>
  );
};

export default QuestionContainer;
