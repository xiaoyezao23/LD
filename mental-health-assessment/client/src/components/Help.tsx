import { Button } from '@/components/ui/button';
import { useAssessment } from '@/contexts/AssessmentContext';
import { ArrowLeft, Phone, Calendar, MessageCircle, Heart, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

/**
 * 求助页
 * 设计风格：温暖陪伴风格
 * - 温暖的关怀提示
 * - 清晰的求助入口
 * - 紧急联系方式
 * - 12356心理援助热线
 * - 医院预约挂号入口
 */

export function Help() {
  const { setStep } = useAssessment();

  const handleCall = (number: string, name: string) => {
    window.location.href = `tel:${number}`;
    toast.info(`正在拨打${name}`, {
      description: `电话号码：${number}`,
    });
  };

  const handleAppointment = () => {
    toast.info('预约挂号功能即将上线', {
      description: '敬请期待，您也可以直接拨打医院电话预约',
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
          <h1 className="font-semibold text-foreground">获取帮助</h1>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="container max-w-lg mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* 关怀提示卡片 */}
          <div className="bg-gradient-to-br from-primary/10 to-violet-100 rounded-3xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-foreground text-lg mb-2">
                  您并不孤单
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  我们检测到您可能需要进一步的支持。请不要担心，专业的帮助随时为您准备。
                  以下是一些可以联系的资源，请选择适合您的方式。
                </p>
              </div>
            </div>
          </div>

          {/* 求助选项 */}
          <div className="space-y-4">
            {/* 12356 心理援助热线 - 首要推荐 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-sm border-2 border-red-200 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-3 py-1 rounded-bl-xl font-medium">
                推荐
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">心理援助热线</h3>
                  <p className="text-sm text-muted-foreground">24小时全天候专业心理咨询</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  onClick={() => handleCall('12356', '12356心理援助热线')}
                  className="w-full h-12 rounded-full bg-red-500 hover:bg-red-600 text-base font-medium"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  拨打 12356
                </Button>
                <Button
                  onClick={() => handleCall('400-161-9995', '全国心理援助热线')}
                  variant="outline"
                  className="w-full h-11 rounded-full border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  400-161-9995（全国热线）
                </Button>
                <Button
                  onClick={() => handleCall('010-82951332', '北京心理危机研究与干预中心')}
                  variant="outline"
                  className="w-full h-11 rounded-full"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  010-82951332（危机干预）
                </Button>
              </div>
            </motion.div>

            {/* 预约医院门诊挂号 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-border/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">预约医院门诊挂号</h3>
                  <p className="text-sm text-muted-foreground">获取专业医生的评估与指导</p>
                </div>
              </div>
              <Button
                onClick={handleAppointment}
                className="w-full h-11 rounded-full bg-gradient-primary hover:opacity-90"
              >
                <Calendar className="w-4 h-4 mr-2" />
                立即预约挂号
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                建议优先选择精神科或心理科门诊
              </p>
            </motion.div>

            {/* 在线咨询 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-border/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">在线咨询</h3>
                  <p className="text-sm text-muted-foreground">通过文字与专业人员沟通</p>
                </div>
              </div>
              <Button
                onClick={() => toast.info('在线咨询功能即将上线')}
                variant="outline"
                className="w-full h-11 rounded-full"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                开始咨询
              </Button>
            </motion.div>
          </div>

          {/* 温馨提示 */}
          <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>温馨提示：</strong>如果您或身边的人正处于紧急危险中，请立即拨打 
              <span className="font-bold"> 120 </span>
              或前往最近的医院急诊。
            </p>
          </div>

          {/* 返回首页 */}
          <div className="mt-6">
            <Button
              onClick={() => {
                setStep('home');
              }}
              variant="ghost"
              className="w-full text-muted-foreground"
            >
              返回首页
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
