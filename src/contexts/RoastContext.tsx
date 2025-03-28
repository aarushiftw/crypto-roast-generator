
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { 
  UserResponse, 
  QuestionData, 
  FuckMarryKillQuestion,
  TraitId,
  RoastResult,
  ActionType
} from '@/lib/types/questionnaire';
import { questions, fmkQuestions } from '@/lib/data/questions';
import { shuffleArray } from '@/lib/utils/helpers';

interface RoastContextType {
  currentQuestionIndex: number;
  totalQuestions: number;
  userResponses: UserResponse[];
  currentQuestion: QuestionData | FuckMarryKillQuestion | null;
  roastResult: RoastResult | null;
  addResponse: (response: UserResponse) => void;
  nextQuestion: () => void;
  restartQuiz: () => void;
  setRoastResult: (result: RoastResult) => void;
  traitScores: Record<TraitId, number>;
  userFMKResponses: Map<string, Record<string, string>>;
  addFMKResponse: (protocol: string, action: ActionType) => void;
  resetFMKResponses: () => void;
  isFinished: boolean;
  answerSelected: boolean;
  setAnswerSelected: (value: boolean) => void;
  responseText: string;
  setResponseText: (text: string) => void;
}

const RoastContext = createContext<RoastContextType | undefined>(undefined);

export const useRoast = () => {
  const context = useContext(RoastContext);
  if (!context) {
    throw new Error('useRoast must be used within a RoastProvider');
  }
  return context;
};

interface RoastProviderProps {
  children: ReactNode;
}

export const RoastProvider: React.FC<RoastProviderProps> = ({ children }) => {
  // Combine and randomly select 10 questions (mixing regular and FMK questions)
  const [shuffledQuestions, setShuffledQuestions] = useState<(QuestionData | FuckMarryKillQuestion)[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [traitScores, setTraitScores] = useState<Record<TraitId, number>>({
    experience: 0,
    portfolio: 0,
    activity: 0,
    risk: 0,
    technical: 0,
    defi: 0
  });
  const [userFMKResponses, setUserFMKResponses] = useState<Map<string, Record<string, string>>>(
    new Map()
  );
  const [isFinished, setIsFinished] = useState(false);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [responseText, setResponseText] = useState('');

  // Initialize questions on component mount
  useEffect(() => {
    const allQuestions = [...questions, ...fmkQuestions];
    const randomQuestions = shuffleArray(allQuestions).slice(0, 10); // Select 10 random questions
    setShuffledQuestions(randomQuestions);
  }, []);

  const currentQuestion = currentQuestionIndex < shuffledQuestions.length 
    ? shuffledQuestions[currentQuestionIndex] 
    : null;

  const addResponse = (response: UserResponse) => {
    // For multiple choice questions
    if (response.answerIndex !== undefined && currentQuestion?.type === 'multiple_choice') {
      const mcQuestion = currentQuestion as QuestionData;
      const selectedAnswer = mcQuestion.answers[response.answerIndex];
      
      // Update trait scores
      const newTraitScores = { ...traitScores };
      Object.entries(selectedAnswer.scores).forEach(([trait, score]) => {
        if (trait in newTraitScores) {
          newTraitScores[trait as TraitId] = (newTraitScores[trait as TraitId] || 0) + score;
        }
      });
      
      setTraitScores(newTraitScores);
      
      // Include scores in the response
      response.scores = selectedAnswer.scores as Record<TraitId, number>;
    }
    
    setUserResponses([...userResponses, response]);
  };

  const addFMKResponse = (protocol: string, action: ActionType) => {
    if (!currentQuestion || currentQuestion.type !== 'fuck_marry_kill') return;
    
    const question = currentQuestion as FuckMarryKillQuestion;
    
    // Create a copy of the current FMK responses
    const newResponses = new Map(userFMKResponses);
    const questionResponses = newResponses.get(question.id) || {};
    
    // Update the response for this protocol
    questionResponses[protocol] = action;
    newResponses.set(question.id, questionResponses);
    
    // Update state
    setUserFMKResponses(newResponses);
    
    // Update trait scores based on the FMK response
    if (question.traitImplications && question.traitImplications[action] && question.traitImplications[action][protocol]) {
      const implications = question.traitImplications[action][protocol];
      const newTraitScores = { ...traitScores };
      
      Object.entries(implications).forEach(([trait, score]) => {
        if (trait in newTraitScores) {
          newTraitScores[trait as TraitId] = (newTraitScores[trait as TraitId] || 0) + score;
        }
      });
      
      setTraitScores(newTraitScores);
    }
  };

  const resetFMKResponses = () => {
    setUserFMKResponses(new Map());
  };

  const nextQuestion = () => {
    setAnswerSelected(false);
    setResponseText('');
    
    if (currentQuestionIndex >= shuffledQuestions.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const restartQuiz = () => {
    // Re-shuffle questions for a new quiz
    const allQuestions = [...questions, ...fmkQuestions];
    const randomQuestions = shuffleArray(allQuestions).slice(0, 10);
    
    setShuffledQuestions(randomQuestions);
    setCurrentQuestionIndex(0);
    setUserResponses([]);
    setRoastResult(null);
    setIsFinished(false);
    setUserFMKResponses(new Map());
    setAnswerSelected(false);
    setResponseText('');
    setTraitScores({
      experience: 0,
      portfolio: 0,
      activity: 0,
      risk: 0,
      technical: 0,
      defi: 0
    });
  };

  return (
    <RoastContext.Provider
      value={{
        currentQuestionIndex,
        totalQuestions: shuffledQuestions.length,
        userResponses,
        currentQuestion,
        roastResult,
        addResponse,
        nextQuestion,
        restartQuiz,
        setRoastResult,
        traitScores,
        userFMKResponses,
        addFMKResponse,
        resetFMKResponses,
        isFinished,
        answerSelected,
        setAnswerSelected,
        responseText,
        setResponseText
      }}
    >
      {children}
    </RoastContext.Provider>
  );
};
