
import React, { useState } from 'react';
import { useRoast } from '@/contexts/RoastContext';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import FuckMarryKillQuestion from './FuckMarryKillQuestion';
import { QuestionData, FuckMarryKillQuestion as FMKQuestionType } from '@/lib/types/questionnaire';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const QuestionContainer: React.FC = () => {
  const { 
    currentQuestion, 
    currentQuestionIndex, 
    totalQuestions, 
    nextQuestion, 
    answerSelected,
    responseText
  } = useRoast();

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

      {answerSelected && responseText && (
        <div className="mt-6 pt-4 border-t border-primary/20 animate-fade-in">
          <div className="bg-secondary/30 p-4 rounded-md">
            <p className="text-primary font-medium mb-2">Analysis:</p>
            <p className="text-foreground/90">{responseText}</p>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button 
              onClick={nextQuestion}
              className="flex items-center gap-2 bg-primary/80 hover:bg-primary text-primary-foreground"
            >
              Next Question <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionContainer;
