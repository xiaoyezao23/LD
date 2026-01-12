import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Shield, AlertTriangle, Users } from "lucide-react";

/**
 * 隐私告知弹窗组件
 * 设计风格：温暖陪伴风格
 * 在用户开始做自测量表之前显示
 */

interface PrivacyDialogProps {
  open: boolean;
  onAccept: () => void;
  onReject: () => void;
}

export default function PrivacyDialog({ open, onAccept, onReject }: PrivacyDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-md mx-4 rounded-2xl border-0 shadow-2xl">
        <AlertDialogHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          <AlertDialogTitle className="text-center text-xl font-semibold">
            隐私告知
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-4 text-left">
              {/* 第一条 */}
              <div className="flex gap-3 p-3 bg-blue-50 rounded-xl">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium">
                  1
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  本服务为同德提供的科普知识工具，并非心理咨询服务/心理健康咨询不构成任何形式的心理相关诊疗服务；互动过程中的知识、词汇可能有理解偏差仅供学习参考，不作为心理咨询服务/诊疗依据。
                </p>
              </div>

              {/* 第二条 */}
              <div className="flex gap-3 p-3 bg-amber-50 rounded-xl">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  服务过程中有任何疑问或者不适，请及时寻求专业心理咨询机构帮助，或者及时就医！
                </p>
              </div>

              {/* 第三条 */}
              <div className="flex gap-3 p-3 bg-purple-50 rounded-xl">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  未成年人请在监护人的帮助下使用，如您未成年请停止使用！
                </p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-3 mt-4">
          <AlertDialogCancel 
            onClick={onReject}
            className="flex-1 h-12 rounded-xl border-2 border-gray-200 hover:bg-gray-50 text-muted-foreground font-medium"
          >
            拒绝
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onAccept}
            className="flex-1 h-12 rounded-xl bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white font-medium shadow-lg shadow-primary/25"
          >
            同意并继续
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
