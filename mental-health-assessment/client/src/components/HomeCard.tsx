import { Button } from '@/components/ui/button';
import { useAssessment } from '@/contexts/AssessmentContext';
import { Clock, Heart, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * 首页入口卡片
 * 设计风格：温暖陪伴风格
 * - 渐变背景营造温暖感
 * - 大圆角卡片设计
 * - 清晰的行动引导
 */

export function HomeCard() {
  const { setStep } = useAssessment();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-soft">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Hero 图片区域 */}
        <div className="relative mb-6 rounded-3xl overflow-hidden shadow-xl">
          <img
            src="/images/hero-bg.png"
            alt="心理健康自测"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h1 className="text-2xl font-bold mb-1">健康自测</h1>
            <p className="text-white/90 text-sm">快速了解您的情绪状态</p>
          </div>
        </div>

        {/* 主卡片 */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-6">
          {/* 特点列表 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">仅需3分钟</p>
                <p className="text-sm text-muted-foreground">快速完成专业量表评估</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">科学评估</p>
                <p className="text-sm text-muted-foreground">PHQ-9 与 GAD-7 国际标准量表</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">隐私保护</p>
                <p className="text-sm text-muted-foreground">您的数据安全有保障</p>
              </div>
            </div>
          </div>

          {/* 开始按钮 */}
          <Button
            onClick={() => setStep('select')}
            className="w-full h-12 text-base font-medium rounded-full bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            立即开始
          </Button>
        </div>

        {/* 免责声明 */}
        <p className="mt-4 text-center text-xs text-muted-foreground px-4">
          本测评仅用于辅助评估与流程引导，不替代医生诊疗决策
        </p>
      </motion.div>
    </div>
  );
}
