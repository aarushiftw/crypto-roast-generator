
import React from 'react';
import { useRoast } from '@/contexts/RoastContext';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import FuckMarryKillQuestion from './FuckMarryKillQuestion';
import { QuestionData } from '@/lib/types/questionnaire';

const QuestionContainer: React.FC = () => {
  const { currentQuestion, currentQuestionIndex, totalQuestions } = useRoast();

  if (!currentQuestion) {
    return <div>Loading next question...</div>;
  }

  return (
    <div className="p-6 bg-card rounded-lg shadow-lg border border-primary/20 max-w-2xl w-full">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>
      </div>

      {currentQuestion.type === 'multiple_choice' ? (
        <MultipleChoiceQuestion question={currentQuestion as QuestionData} />
      ) : currentQuestion.type === 'fuck_marry_kill' ? (
        <FuckMarryKillQuestion question={currentQuestion} />
      ) : (
        <div>Unknown question type</div>
      )}
    </div>
  );
};

export default QuestionContainer;
