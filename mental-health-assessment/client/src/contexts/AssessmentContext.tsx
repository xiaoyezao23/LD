import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Scale, LevelConfig, getScale, getLevelConfig, checkRiskFlag } from '@/data/scales';
import { UserProfileData } from '@/components/UserProfile';

/**
 * 测评状态管理
 * 设计风格：温暖陪伴风格
 * 
 * 新增功能：
 * - PHQ-9第9题风险拦截
 * - 用户档案管理
 * - 匿名使用支持
 */

export type AssessmentStep = 'home' | 'profile' | 'select' | 'assessment' | 'result' | 'selfhelp' | 'help';

interface AssessmentState {
  step: AssessmentStep;
  selectedScale: Scale | null;
  currentQuestionIndex: number;
  answers: number[];
  totalScore: number;
  levelConfig: LevelConfig | null;
  hasRiskFlag: boolean;
  completedAt: Date | null;
  // 风险拦截
  showRiskIntercept: boolean;
  // 用户档案
  userProfile: UserProfileData | null;
}

interface AssessmentContextType extends AssessmentState {
  setStep: (step: AssessmentStep) => void;
  selectScale: (scaleId: string) => void;
  answerQuestion: (score: number) => void;
  goToPreviousQuestion: () => void;
  submitAssessment: () => void;
  resetAssessment: () => void;
  setShowRiskIntercept: (show: boolean) => void;
  setUserProfile: (profile: UserProfileData) => void;
  canGoBack: boolean;
  canSubmit: boolean;
  progress: number;
}

const initialState: AssessmentState = {
  step: 'home',
  selectedScale: null,
  currentQuestionIndex: 0,
  answers: [],
  totalScore: 0,
  levelConfig: null,
  hasRiskFlag: false,
  completedAt: null,
  showRiskIntercept: false,
  userProfile: null,
};

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AssessmentState>(initialState);

  const setStep = useCallback((step: AssessmentStep) => {
    setState((prev) => ({ ...prev, step }));
  }, []);

  const selectScale = useCallback((scaleId: string) => {
    const scale = getScale(scaleId);
    if (scale) {
      setState((prev) => ({
        ...prev,
        selectedScale: scale,
        currentQuestionIndex: 0,
        answers: [],
        showRiskIntercept: false,
        step: 'assessment',
      }));
    }
  }, []);

  const answerQuestion = useCallback((score: number) => {
    setState((prev) => {
      if (!prev.selectedScale) return prev;

      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestionIndex] = score;

      // PHQ-9第9题风险拦截：选择≥1分时立即中断
      if (
        prev.selectedScale.id === 'PHQ-9' &&
        prev.currentQuestionIndex === 8 && // 第9题（索引8）
        score >= 1
      ) {
        return {
          ...prev,
          answers: newAnswers,
          showRiskIntercept: true,
        };
      }

      const isLastQuestion = prev.currentQuestionIndex === prev.selectedScale.questions.length - 1;

      if (isLastQuestion) {
        return {
          ...prev,
          answers: newAnswers,
        };
      }

      // 自动跳转到下一题
      return {
        ...prev,
        answers: newAnswers,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      };
    });
  }, []);

  const goToPreviousQuestion = useCallback(() => {
    setState((prev) => {
      if (prev.currentQuestionIndex > 0) {
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex - 1,
        };
      }
      return prev;
    });
  }, []);

  const submitAssessment = useCallback(() => {
    setState((prev) => {
      if (!prev.selectedScale) return prev;

      const totalScore = prev.answers.reduce((sum, score) => sum + score, 0);
      const levelConfig = getLevelConfig(prev.selectedScale.id, totalScore);
      const hasRiskFlag = checkRiskFlag(prev.selectedScale.id, prev.answers);

      return {
        ...prev,
        totalScore,
        levelConfig: levelConfig || null,
        hasRiskFlag,
        completedAt: new Date(),
        step: 'result',
      };
    });
  }, []);

  const resetAssessment = useCallback(() => {
    setState((prev) => ({
      ...initialState,
      userProfile: prev.userProfile, // 保留用户档案
    }));
  }, []);

  const setShowRiskIntercept = useCallback((show: boolean) => {
    setState((prev) => ({ ...prev, showRiskIntercept: show }));
  }, []);

  const setUserProfile = useCallback((profile: UserProfileData) => {
    setState((prev) => ({ ...prev, userProfile: profile }));
  }, []);

  const canGoBack = state.currentQuestionIndex > 0;
  const canSubmit =
    state.selectedScale !== null &&
    state.answers.length === state.selectedScale.questions.length &&
    state.answers.every((a) => a !== undefined);

  const progress = state.selectedScale
    ? ((state.currentQuestionIndex + 1) / state.selectedScale.questions.length) * 100
    : 0;

  return (
    <AssessmentContext.Provider
      value={{
        ...state,
        setStep,
        selectScale,
        answerQuestion,
        goToPreviousQuestion,
        submitAssessment,
        resetAssessment,
        setShowRiskIntercept,
        setUserProfile,
        canGoBack,
        canSubmit,
        progress,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
