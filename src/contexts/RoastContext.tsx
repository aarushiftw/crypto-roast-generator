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
  // Combine and randomly select questions (limiting FMK questions to exactly 2)
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
    // Shuffle both question types
    const shuffledMCQuestions = shuffleArray([...questions]);
    const shuffledFMKQuestions = shuffleArray([...fmkQuestions]);
    
    // Always include exactly 2 FMK questions
    const selectedFMKQuestions = shuffledFMKQuestions.slice(0, 2);
    
    // Calculate how many MC questions we need to get to 8 total (was 10)
    const mcQuestionsNeeded = 8 - selectedFMKQuestions.length;
    const selectedMCQuestions = shuffledMCQuestions.slice(0, mcQuestionsNeeded);
    
    // Position FMK questions to be evenly distributed
    const firstFMKPosition = Math.floor(mcQuestionsNeeded / 3);  // Around 1/3 of the way through
    const secondFMKPosition = Math.floor(mcQuestionsNeeded * 2 / 3);  // Around 2/3 of the way through
    
    let allSelectedQuestions: (QuestionData | FuckMarryKillQuestion)[] = [];
    
    for (let i = 0; i < mcQuestionsNeeded; i++) {
      if (i === firstFMKPosition) {
        allSelectedQuestions.push(selectedFMKQuestions[0]);
      } else if (i === secondFMKPosition) {
        allSelectedQuestions.push(selectedFMKQuestions[1]);
      }
      
      if (i < selectedMCQuestions.length) {
        allSelectedQuestions.push(selectedMCQuestions[i]);
      }
    }
    
    // Ensure we have exactly 8 questions
    allSelectedQuestions = allSelectedQuestions.slice(0, 8);
    
    setShuffledQuestions(allSelectedQuestions);
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
    // Re-shuffle questions for a new quiz, with exactly 2 FMK questions out of 8 total
    const shuffledMCQuestions = shuffleArray([...questions]);
    const shuffledFMKQuestions = shuffleArray([...fmkQuestions]);
    
    // Always select exactly 2 FMK questions
    const selectedFMKQuestions = shuffledFMKQuestions.slice(0, 2);
    
    // Calculate how many MC questions we need to get to 8 total
    const mcQuestionsNeeded = 8 - selectedFMKQuestions.length;
    const selectedMCQuestions = shuffledMCQuestions.slice(0, mcQuestionsNeeded);
    
    // Position FMK questions to be evenly distributed
    const allSelectedQuestions = [];
    const firstPosition = Math.floor(Math.random() * (mcQuestionsNeeded / 2));
    const secondPosition = Math.floor(mcQuestionsNeeded / 2) + 1 + 
                          Math.floor(Math.random() * (mcQuestionsNeeded / 2 - 1));
    
    for (let i = 0; i < mcQuestionsNeeded; i++) {
      if (i === firstPosition) {
        allSelectedQuestions.push(selectedFMKQuestions[0]);
      } else if (i === secondPosition) {
        allSelectedQuestions.push(selectedFMKQuestions[1]);
      }
      
      if (i < selectedMCQuestions.length) {
        allSelectedQuestions.push(selectedMCQuestions[i]);
      }
    }
    
    setShuffledQuestions(allSelectedQuestions.slice(0, 8));
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
