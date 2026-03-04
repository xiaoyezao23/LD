import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAssessment } from '@/contexts/AssessmentContext';
import { ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import RiskInterceptDialog from './RiskInterceptDialog';
import { toast } from 'sonner';

/**
 * 量表作答页
 * 设计风格：温暖陪伴风格
 * - 单题逐页展示
 * - 清晰的进度条
 * - 柔和的选项交互
 * - PHQ-9第9题风险拦截
 */

export function Assessment() {
  const {
    selectedScale,
    currentQuestionIndex,
    answers,
    progress,
    canGoBack,
    canSubmit,
    showRiskIntercept,
    answerQuestion,
    goToPreviousQuestion,
    submitAssessment,
    resetAssessment,
    setStep,
    setShowRiskIntercept,
  } = useAssessment();

  if (!selectedScale) {
    return null;
  }

  const currentQuestion = selectedScale.questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === selectedScale.questions.length - 1;

  // PHQ-9第9题特殊提示
  const isPHQ9Question9 = selectedScale.id === 'PHQ-9' && currentQuestionIndex === 8;

  const handleOptionClick = (value: number) => {
    answerQuestion(value);
  };

  const handleExit = () => {
    resetAssessment();
    setStep('home');
  };

  // 风险拦截 - 拨打热线
  const handleCallHotline = () => {
    setShowRiskIntercept(false);
    // 尝试拨打电话
    window.location.href = 'tel:12356';
    toast.info('正在拨打心理援助热线', {
      description: '电话号码：12356',
    });
  };

  // 风险拦截 - 预约挂号
  const handleBookAppointment = () => {
    setShowRiskIntercept(false);
    toast.info('正在跳转预约挂号', {
      description: '即将为您打开医院预约挂号页面',
    });
    // 这里可以跳转到医院预约挂号系统
    resetAssessment();
    setStep('help');
  };

  // 风险拦截 - 返回首页
  const handleGoHome = () => {
    setShowRiskIntercept(false);
    resetAssessment();
    setStep('home');
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      {/* PHQ-9第9题风险拦截弹窗 */}
      <RiskInterceptDialog
        open={showRiskIntercept}
        onCallHotline={handleCallHotline}
        onBookAppointment={handleBookAppointment}
        onGoHome={handleGoHome}
      />

      {/* 顶部导航 */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border/50">
        <div className="container max-w-lg mx-auto px-4">
          <div className="h-14 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPreviousQuestion}
              disabled={!canGoBack}
              className="text-muted-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <div className="flex-1 mx-4">
              <div className="text-center text-sm font-medium text-foreground mb-1">
                {selectedScale.name}
              </div>
              <div className="flex items-center gap-2">
                <Progress value={progress} className="h-1.5 flex-1" />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {currentQuestionIndex + 1}/{selectedScale.questions.length}
                </span>
              </div>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <X className="w-5 h-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-sm rounded-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>确定要退出吗？</AlertDialogTitle>
                  <AlertDialogDescription>
                    退出后当前作答进度将不会保存，您需要重新开始测评。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-full">继续作答</AlertDialogCancel>
                  <AlertDialogAction onClick={handleExit} className="rounded-full">
                    确定退出
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      {/* 问题区域 */}
      <div className="flex-1 container max-w-lg mx-auto px-4 py-6 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {/* 问题提示 */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                在过去的两周里，您有多少时间受到以下问题的困扰？
              </p>
            </div>

            {/* 问题内容 */}
            <div className={`rounded-2xl p-5 shadow-sm mb-6 ${
              isPHQ9Question9 
                ? 'bg-rose-50 border-2 border-rose-200' 
                : 'bg-white'
            }`}>
              <div className="flex items-start gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm shrink-0 ${
                  isPHQ9Question9
                    ? 'bg-rose-100 text-rose-600'
                    : 'bg-primary/10 text-primary'
                }`}>
                  {currentQuestion.id}
                </span>
                <p className="text-foreground font-medium leading-relaxed pt-1">
                  {currentQuestion.text}
                </p>
              </div>
              {/* PHQ-9第9题特殊提示 */}
              {isPHQ9Question9 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 pt-3 border-t border-rose-200"
                >
                  <p className="text-xs text-rose-500 leading-relaxed">
                    这道题涉及一些敏感内容，请您如实作答。如果您正在经历困难，请记住专业帮助随时可用。
                  </p>
                </motion.div>
              )}
            </div>

            {/* 选项列表 */}
            <div className="space-y-3 flex-1">
              {selectedScale.options.map((option) => (
                <motion.button
                  key={option.value}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionClick(option.value)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    currentAnswer === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border/50 bg-white hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        currentAnswer === option.value
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground/30'
                      }`}
                    >
                      {currentAnswer === option.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-white"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{option.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 提交按钮（最后一题时显示） */}
        {isLastQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Button
              onClick={submitAssessment}
              disabled={!canSubmit}
              className="w-full h-12 text-base font-medium rounded-full bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              提交答卷
            </Button>
          </motion.div>
        )}
      </div>

      {/* 底部免责声明 */}
      <div className="bg-white/80 backdrop-blur-md border-t border-border/50 py-3">
        <p className="text-center text-xs text-muted-foreground px-4">
          本测评仅用于辅助评估与流程引导，不替代医生诊疗决策
        </p>
      </div>
    </div>
  );
}
