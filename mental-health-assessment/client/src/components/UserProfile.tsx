import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, ChevronRight, UserCircle } from "lucide-react";
import { motion } from "framer-motion";

/**
 * 用户档案管理组件
 * 性别、年龄、职业、学历等个人信息（全部选填）
 * 支持匿名模式
 */

export interface UserProfileData {
  nickname: string;
  gender: string;
  age: string;
  occupation: string;
  education: string;
}

interface UserProfileProps {
  onBack: () => void;
  onSave: (data: UserProfileData) => void;
  onSkip: () => void;
  initialData?: UserProfileData;
}

const defaultProfile: UserProfileData = {
  nickname: "",
  gender: "",
  age: "",
  occupation: "",
  education: "",
};

export default function UserProfile({
  onBack,
  onSave,
  onSkip,
  initialData,
}: UserProfileProps) {
  const [profile, setProfile] = useState<UserProfileData>(
    initialData || defaultProfile
  );

  const updateField = (field: keyof UserProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const hasAnyData = Object.values(profile).some((v) => v.trim() !== "");

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-border/50">
        <div className="container max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="mr-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-semibold text-foreground">个人档案</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSkip}
            className="text-muted-foreground"
          >
            跳过
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="container max-w-lg mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* 匿名提示 */}
          <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-2xl mb-6">
            <UserCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                匿名使用，信息选填
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                所有信息均为选填，您可以完全匿名使用本服务。填写个人信息仅用于提供更精准的评估建议，不会泄露给第三方。
              </p>
            </div>
          </div>

          {/* 表单 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 space-y-5">
            {/* 头像和昵称 */}
            <div className="flex items-center gap-4 pb-4 border-b border-border/50">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                <User className="w-8 h-8 text-primary/60" />
              </div>
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  昵称（选填）
                </Label>
                <Input
                  value={profile.nickname}
                  onChange={(e) => updateField("nickname", e.target.value)}
                  placeholder="匿名用户"
                  className="h-10 rounded-xl border-gray-200"
                />
              </div>
            </div>

            {/* 性别 */}
            <div className="space-y-1.5">
              <Label className="text-sm text-foreground font-medium">
                性别（选填）
              </Label>
              <Select
                value={profile.gender}
                onValueChange={(v) => updateField("gender", v)}
              >
                <SelectTrigger className="h-11 rounded-xl border-gray-200">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="male">男</SelectItem>
                  <SelectItem value="female">女</SelectItem>
                  <SelectItem value="other">其他</SelectItem>
                  <SelectItem value="prefer_not_to_say">不愿透露</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 年龄 */}
            <div className="space-y-1.5">
              <Label className="text-sm text-foreground font-medium">
                年龄段（选填）
              </Label>
              <Select
                value={profile.age}
                onValueChange={(v) => updateField("age", v)}
              >
                <SelectTrigger className="h-11 rounded-xl border-gray-200">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="18-24">18-24岁</SelectItem>
                  <SelectItem value="25-34">25-34岁</SelectItem>
                  <SelectItem value="35-44">35-44岁</SelectItem>
                  <SelectItem value="45-54">45-54岁</SelectItem>
                  <SelectItem value="55-64">55-64岁</SelectItem>
                  <SelectItem value="65+">65岁以上</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 职业 */}
            <div className="space-y-1.5">
              <Label className="text-sm text-foreground font-medium">
                职业（选填）
              </Label>
              <Select
                value={profile.occupation}
                onValueChange={(v) => updateField("occupation", v)}
              >
                <SelectTrigger className="h-11 rounded-xl border-gray-200">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="student">学生</SelectItem>
                  <SelectItem value="employee">企业职员</SelectItem>
                  <SelectItem value="civil_servant">公务员/事业单位</SelectItem>
                  <SelectItem value="freelancer">自由职业</SelectItem>
                  <SelectItem value="business_owner">企业主/个体户</SelectItem>
                  <SelectItem value="medical">医疗卫生</SelectItem>
                  <SelectItem value="education">教育行业</SelectItem>
                  <SelectItem value="retired">退休</SelectItem>
                  <SelectItem value="unemployed">待业</SelectItem>
                  <SelectItem value="other_occupation">其他</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 学历 */}
            <div className="space-y-1.5">
              <Label className="text-sm text-foreground font-medium">
                学历（选填）
              </Label>
              <Select
                value={profile.education}
                onValueChange={(v) => updateField("education", v)}
              >
                <SelectTrigger className="h-11 rounded-xl border-gray-200">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="junior_high">初中及以下</SelectItem>
                  <SelectItem value="high_school">高中/中专</SelectItem>
                  <SelectItem value="college">大专</SelectItem>
                  <SelectItem value="bachelor">本科</SelectItem>
                  <SelectItem value="master">硕士</SelectItem>
                  <SelectItem value="phd">博士及以上</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="mt-6 space-y-3">
            <Button
              onClick={() => onSave(profile)}
              className="w-full h-12 text-base font-medium rounded-full bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {hasAnyData ? "保存并继续" : "匿名继续"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              您的信息仅用于评估参考，不会泄露给第三方
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
