import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAssessment } from '@/contexts/AssessmentContext';
import { PHQ9, GAD7 } from '@/data/scales';
import { ArrowLeft, Brain, Heart, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import PrivacyDialog from './PrivacyDialog';

/**
 * 量表选择页
 * 设计风格：温暖陪伴风格
 * - 卡片式选择
 * - 清晰的量表说明
 * - 温暖的视觉引导
 * - 隐私告知弹窗
 */

interface ScaleCardProps {
  scale: typeof PHQ9;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

function ScaleCard({ scale, icon, color, onClick }: ScaleCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-5 shadow-sm border border-border/50 text-left card-hover"
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-lg mb-1">
            {scale.fullName}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {scale.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {scale.duration}
            </span>
            <span>{scale.questions.length} 道题目</span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground mt-1" />
      </div>
    </motion.button>
  );
}

export function ScaleSelect() {
  const { setStep, selectScale } = useAssessment();
  
  // 隐私告知弹窗状态
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
  const [pendingScaleId, setPendingScaleId] = useState<'PHQ-9' | 'GAD-7' | null>(null);

  // 点击量表卡片时，先显示隐私告知弹窗
  const handleScaleClick = (scaleId: 'PHQ-9' | 'GAD-7') => {
    setPendingScaleId(scaleId);
    setShowPrivacyDialog(true);
  };

  // 用户同意隐私告知
  const handleAcceptPrivacy = () => {
    setShowPrivacyDialog(false);
    if (pendingScaleId) {
      selectScale(pendingScaleId);
    }
    setPendingScaleId(null);
  };

  // 用户拒绝隐私告知
  const handleRejectPrivacy = () => {
    setShowPrivacyDialog(false);
    setPendingScaleId(null);
    setStep('home');
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* 隐私告知弹窗 */}
      <PrivacyDialog
        open={showPrivacyDialog}
        onAccept={handleAcceptPrivacy}
        onReject={handleRejectPrivacy}
      />

      {/* 顶部导航 */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border/50">
        <div className="container max-w-lg mx-auto px-4 h-14 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setStep('home')}
            className="mr-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold text-foreground">选择量表</h1>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="container max-w-lg mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* 说明文字 */}
          <div className="mb-6">
            <p className="text-muted-foreground text-sm leading-relaxed">
              请选择您想要进行的自评量表。每张量表约需3分钟作答，系统将自动计算评分并提供建议方向。
            </p>
          </div>

          {/* 量表选择卡片 */}
          <div className="space-y-4">
            <ScaleCard
              scale={PHQ9}
              icon={<Heart className="w-6 h-6 text-white" />}
              color="bg-gradient-to-br from-rose-400 to-rose-500"
              onClick={() => handleScaleClick('PHQ-9')}
            />

            <ScaleCard
              scale={GAD7}
              icon={<Brain className="w-6 h-6 text-white" />}
              color="bg-gradient-to-br from-violet-400 to-violet-500"
              onClick={() => handleScaleClick('GAD-7')}
            />
          </div>

          {/* 提示信息 */}
          <div className="mt-8 p-4 bg-primary/5 rounded-2xl">
            <h4 className="font-medium text-foreground mb-2 text-sm">温馨提示</h4>
            <ul className="text-xs text-muted-foreground space-y-1.5">
              <li>• 请根据过去两周内的实际感受作答</li>
              <li>• 答案没有对错之分，请如实选择</li>
              <li>• 作答过程中可随时返回修改</li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* 底部免责声明 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-border/50 py-3">
        <p className="text-center text-xs text-muted-foreground px-4">
          本测评仅用于辅助评估与流程引导，不替代医生诊疗决策
        </p>
      </div>
    </div>
  );
}
