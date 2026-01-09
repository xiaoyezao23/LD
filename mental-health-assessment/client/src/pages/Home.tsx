import { AssessmentProvider, useAssessment } from '@/contexts/AssessmentContext';
import { HomeCard } from '@/components/HomeCard';
import { ScaleSelect } from '@/components/ScaleSelect';
import { Assessment } from '@/components/Assessment';
import { Result } from '@/components/Result';
import { SelfHelp } from '@/components/SelfHelp';
import { Help } from '@/components/Help';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * 心理测评模块主页面
 * 设计风格：温暖陪伴风格
 * 
 * 页面流程：
 * 1. 首页入口卡片 (home)
 * 2. 量表选择页 (select)
 * 3. 量表作答页 (assessment)
 * 4. 结果页 (result)
 * 5. 自助调适页 (selfhelp)
 * 6. 求助页 (help)
 */

function AssessmentFlow() {
  const { step } = useAssessment();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {step === 'home' && <HomeCard />}
        {step === 'select' && <ScaleSelect />}
        {step === 'assessment' && <Assessment />}
        {step === 'result' && <Result />}
        {step === 'selfhelp' && <SelfHelp />}
        {step === 'help' && <Help />}
      </motion.div>
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <AssessmentProvider>
      <AssessmentFlow />
    </AssessmentProvider>
  );
}
