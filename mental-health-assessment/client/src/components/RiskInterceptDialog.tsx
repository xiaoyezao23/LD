import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, Calendar, Heart } from "lucide-react";
import { motion } from "framer-motion";

/**
 * PHQ-9 第9题风险拦截弹窗
 * 当用户在第9题（自杀/自伤念头）选择≥1分时触发
 * 立即中断测评，提供专业求助入口
 */

interface RiskInterceptDialogProps {
  open: boolean;
  onCallHotline: () => void;
  onBookAppointment: () => void;
  onGoHome: () => void;
}

export default function RiskInterceptDialog({
  open,
  onCallHotline,
  onBookAppointment,
  onGoHome,
}: RiskInterceptDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-md mx-4 rounded-2xl border-0 shadow-2xl p-0 overflow-hidden">
        {/* 顶部红色警示区域 */}
        <div className="bg-gradient-to-r from-red-500 to-rose-500 px-6 pt-6 pb-8 text-white text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4"
          >
            <AlertTriangle className="w-8 h-8" />
          </motion.div>
          <AlertDialogHeader className="space-y-2">
            <AlertDialogTitle className="text-xl font-bold text-white text-center">
              我们非常关心您的安全
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/90 text-center text-sm leading-relaxed">
              根据您的回答，我们检测到您可能正在经历一些困难的想法。
              这些想法虽然令人痛苦，但专业的帮助可以让情况好转。
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        {/* 内容区域 */}
        <div className="px-6 py-5 space-y-4">
          {/* 温暖提示 */}
          <div className="flex items-start gap-3 p-3 bg-rose-50 rounded-xl">
            <Heart className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-rose-700 leading-relaxed">
              您并不孤单。我们强烈建议您与专业人员沟通，他们可以为您提供有效的帮助和支持。
              <strong>本系统不建议您继续进行自评</strong>，请优先寻求专业评估。
            </p>
          </div>

          {/* 求助按钮 */}
          <AlertDialogFooter className="flex-col gap-3 sm:flex-col">
            <Button
              onClick={onCallHotline}
              className="w-full h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium text-base gap-2"
            >
              <Phone className="w-5 h-5" />
              拨打心理援助热线 12356
            </Button>

            <Button
              onClick={onBookAppointment}
              variant="outline"
              className="w-full h-12 rounded-xl border-2 border-primary text-primary hover:bg-primary/5 font-medium text-base gap-2"
            >
              <Calendar className="w-5 h-5" />
              预约医院门诊挂号
            </Button>

            <div className="w-full border-t border-gray-100 pt-3 mt-1">
              <Button
                onClick={onGoHome}
                variant="ghost"
                className="w-full h-10 text-muted-foreground text-sm"
              >
                返回首页
              </Button>
            </div>
          </AlertDialogFooter>

          {/* 紧急提示 */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
            <p className="text-xs text-amber-700 leading-relaxed text-center">
              如果您或身边的人正处于紧急危险中，请立即拨打
              <span className="font-bold"> 120 </span>
              或前往最近的医院急诊
            </p>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
