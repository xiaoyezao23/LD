import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAssessment } from '@/contexts/AssessmentContext';
import { selfHelpContents } from '@/data/scales';
import {
  AlertTriangle,
  Phone,
  Calendar,
  Bell,
  Sparkles,
  Home,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import SemiCircleProgress from './SemiCircleProgress';
import ChatWindow from './ChatWindow';

/**
 * 结果页
 * 设计风格：温暖陪伴风格
 * - 半圆形分数进度条
 * - 关注等级色彩标识
 * - 清晰的结论摘要
 * - 温暖的下一步建议
 * - 5-9分区间显示聊天窗口
 */

const levelStyles = {
  green: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    badge: 'bg-emerald-500',
    progressLevel: 'low' as const,
  },
  yellow: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-700',
    badge: 'bg-amber-500',
    progressLevel: 'medium' as const,
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
    badge: 'bg-orange-500',
    progressLevel: 'high' as const,
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    badge: 'bg-red-500',
    progressLevel: 'critical' as const,
  },
};

export function Result() {
  const {
    selectedScale,
    totalScore,
    levelConfig,
    hasRiskFlag,
    setStep,
    resetAssessment,
  } = useAssessment();

  // 聊天窗口状态 - 5-9分区间显示
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // 判断是否显示聊天窗口（5-9分区间）
  const showChatWindow = totalScore >= 5 && totalScore <= 9;

  if (!selectedScale || !levelConfig) {
    return null;
  }

  const style = levelStyles[levelConfig.level];
  const maxScore = selectedScale.id === 'PHQ-9' ? 27 : 21;
  const showSelfHelp = levelConfig.level === 'green' || levelConfig.level === 'yellow';

  const handleAction = (action: string) => {
    switch (action) {
      case '自助调适':
        setStep('selfhelp');
        break;
      case '一键求助':
        setStep('help');
        break;
      case '去预约':
        toast.info('预约功能即将上线', {
          description: '敬请期待',
        });
        break;
      case '设置复评提醒':
        toast.success('复评提醒已设置', {
          description: levelConfig.level === 'orange' ? '7天后提醒您复评' : '14天后提醒您复评',
        });
        break;
      default:
        break;
    }
  };

  const handleGoHome = () => {
    resetAssessment();
    setStep('home');
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* 安全提示横幅 */}
      {hasRiskFlag && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500 text-white px-4 py-3"
        >
          <div className="container max-w-lg mx-auto flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-sm">检测到风险信号</p>
              <p className="text-xs text-white/90">请考虑尽快联系专业人员获取帮助</p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setStep('help')}
              className="shrink-0 rounded-full bg-white text-red-500 hover:bg-white/90"
            >
              立即求助
            </Button>
          </div>
        </motion.div>
      )}

      {/* 主要内容 */}
      <div className="container max-w-lg mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 结果卡片 */}
          <div className={`rounded-3xl p-6 ${style.bg} ${style.border} border-2 mb-6`}>
            {/* 半圆形分数进度条 */}
            <SemiCircleProgress
              score={totalScore}
              maxScore={maxScore}
              level={style.progressLevel}
              scaleName={selectedScale.fullName}
            />

            {/* 评估结论 */}
            <div className={`p-4 rounded-xl bg-white/60 ${style.text} mt-6`}>
              <p className="text-sm font-medium mb-1">{levelConfig.description}</p>
              <p className="text-sm opacity-80">{levelConfig.recommendation}</p>
            </div>
          </div>

          {/* 5-9分区间提示卡片 */}
          {showChatWindow && !isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mb-6 p-4 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl border border-primary/20"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">想聊聊吗？</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    我注意到你最近可能有一些轻微的情绪波动。如果你愿意，可以和我聊聊你的感受，我会认真倾听。
                  </p>
                  <Button
                    onClick={() => setIsChatOpen(true)}
                    className="rounded-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                    size="sm"
                  >
                    开始聊天
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 推荐动作按钮 */}
          <div className="space-y-3 mb-6">
            {hasRiskFlag && (
              <Button
                onClick={() => handleAction('一键求助')}
                className="w-full h-12 text-base font-medium rounded-full bg-red-500 hover:bg-red-600"
              >
                <Phone className="w-5 h-5 mr-2" />
                一键求助
              </Button>
            )}

            <Button
              onClick={() => handleAction(levelConfig.actions.primary)}
              className={`w-full h-12 text-base font-medium rounded-full ${
                hasRiskFlag
                  ? 'bg-white text-foreground border-2 border-border hover:bg-muted'
                  : 'bg-gradient-primary hover:opacity-90'
              }`}
              variant={hasRiskFlag ? 'outline' : 'default'}
            >
              {levelConfig.actions.primary === '自助调适' && (
                <Sparkles className="w-5 h-5 mr-2" />
              )}
              {levelConfig.actions.primary === '去预约' && (
                <Calendar className="w-5 h-5 mr-2" />
              )}
              {levelConfig.actions.primary === '一键求助' && !hasRiskFlag && (
                <Phone className="w-5 h-5 mr-2" />
              )}
              {levelConfig.actions.primary}
            </Button>

            <Button
              onClick={() => handleAction(levelConfig.actions.secondary)}
              variant="outline"
              className="w-full h-12 text-base font-medium rounded-full"
            >
              {levelConfig.actions.secondary === '设置复评提醒' && (
                <Bell className="w-5 h-5 mr-2" />
              )}
              {levelConfig.actions.secondary === '去预约' && (
                <Calendar className="w-5 h-5 mr-2" />
              )}
              {levelConfig.actions.secondary}
            </Button>
          </div>

          {/* 自助调节内容推荐 */}
          {showSelfHelp && (
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                推荐身心调节内容
              </h3>
              <div className="space-y-3">
                {selfHelpContents
                  .filter((content) =>
                    content.targetLevels.includes(levelConfig.level as 'green' | 'yellow')
                  )
                  .map((content) => (
                    <motion.button
                      key={content.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        toast.info('内容即将上线', {
                          description: `${content.title}功能敬请期待`,
                        });
                      }}
                      className="w-full bg-white rounded-xl overflow-hidden shadow-sm border border-border/50 flex items-center"
                    >
                      <img
                        src={content.image}
                        alt={content.title}
                        className="w-20 h-20 object-cover"
                      />
                      <div className="flex-1 p-3 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {content.type}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {content.duration}
                          </span>
                        </div>
                        <p className="font-medium text-foreground text-sm">
                          {content.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {content.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground mr-3" />
                    </motion.button>
                  ))}
              </div>
            </div>
          )}

          {/* 返回首页 */}
          <Button
            onClick={handleGoHome}
            variant="ghost"
            className="w-full h-12 text-muted-foreground"
          >
            <Home className="w-5 h-5 mr-2" />
            返回首页
          </Button>
        </motion.div>
      </div>

      {/* 底部免责声明 */}
      <div className="bg-white/80 backdrop-blur-md border-t border-border/50 py-3">
        <p className="text-center text-xs text-muted-foreground px-4">
          本测评仅用于辅助评估与流程引导，不替代医生诊疗决策
        </p>
      </div>

      {/* 聊天窗口 - 5-9分区间显示 */}
      {showChatWindow && (
        <ChatWindow
          isOpen={isChatOpen}
          onOpen={() => setIsChatOpen(true)}
          onClose={() => setIsChatOpen(false)}
          scaleName={selectedScale.fullName}
          score={totalScore}
        />
      )}
    </div>
  );
}
