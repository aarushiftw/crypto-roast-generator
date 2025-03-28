
import React from 'react';
import { useRoast } from '@/contexts/RoastContext';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import FuckMarryKillQuestion from './FuckMarryKillQuestion';
import { QuestionData, FuckMarryKillQuestion as FMKQuestionType } from '@/lib/types/questionnaire';

const QuestionContainer: React.FC = () => {
  const { currentQuestion, currentQuestionIndex, totalQuestions } = useRoast();

  if (!currentQuestion) {
    return <div className="p-6 bg-card/80 rounded-lg shadow-lg cyberpunk-border max-w-2xl w-full">
      <p className="text-center">Loading next question...</p>
    </div>;
  }

  return (
    <div className="p-6 bg-card/80 rounded-lg shadow-lg cyberpunk-border max-w-2xl w-full">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-primary font-medium">
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
  );
};

export default QuestionContainer;
