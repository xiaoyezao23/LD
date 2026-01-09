import { Button } from '@/components/ui/button';
import { useAssessment } from '@/contexts/AssessmentContext';
import { selfHelpContents } from '@/data/scales';
import { ArrowLeft, Clock, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

/**
 * 自助调适页
 * 设计风格：温暖陪伴风格
 * - 卡片式内容展示
 * - 温暖的视觉引导
 * - 清晰的内容分类
 */

export function SelfHelp() {
  const { setStep } = useAssessment();

  const handleContentClick = (title: string) => {
    toast.info('内容即将上线', {
      description: `${title}功能敬请期待`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border/50">
        <div className="container max-w-lg mx-auto px-4 h-14 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setStep('result')}
            className="mr-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold text-foreground">自助调适</h1>
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
            <h2 className="text-lg font-semibold text-foreground mb-2">
              身心调节推荐
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              以下内容可以帮助您放松身心、缓解压力。选择适合您的方式，开始调节之旅。
            </p>
          </div>

          {/* 内容卡片列表 */}
          <div className="space-y-4">
            {selfHelpContents.map((content, index) => (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => handleContentClick(content.title)}
                  className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-border/50 text-left card-hover"
                >
                  {/* 图片区域 */}
                  <div className="relative h-40">
                    <img
                      src={content.image}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    
                    {/* 播放按钮 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 text-primary ml-1" />
                      </div>
                    </div>

                    {/* 时长标签 */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 text-white text-xs">
                      <Clock className="w-3 h-3" />
                      {content.duration}
                    </div>
                  </div>

                  {/* 内容信息 */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        {content.type}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {content.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {content.description}
                    </p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {/* 更多内容提示 */}
          <div className="mt-8 p-4 bg-primary/5 rounded-2xl text-center">
            <p className="text-sm text-muted-foreground">
              更多身心调节内容持续更新中...
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
