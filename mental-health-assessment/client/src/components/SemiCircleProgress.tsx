import { motion } from "framer-motion";

/**
 * 半圆形分数进度条组件
 * 设计风格：温暖陪伴风格
 * 用于结果页展示分数
 */

interface SemiCircleProgressProps {
  score: number;
  maxScore: number;
  level: 'low' | 'medium' | 'high' | 'critical';
  scaleName: string;
}

export default function SemiCircleProgress({ 
  score, 
  maxScore, 
  level,
  scaleName 
}: SemiCircleProgressProps) {
  const percentage = (score / maxScore) * 100;
  
  // 半圆的参数
  const radius = 80;
  const strokeWidth = 12;
  const circumference = Math.PI * radius; // 半圆周长
  const progress = (percentage / 100) * circumference;
  
  // 根据关注等级设置颜色
  const levelConfig = {
    low: {
      color: '#22c55e',
      gradient: ['#22c55e', '#4ade80'],
      bgColor: '#dcfce7',
      label: '低关注',
      emoji: '😊'
    },
    medium: {
      color: '#eab308',
      gradient: ['#eab308', '#facc15'],
      bgColor: '#fef9c3',
      label: '中等关注',
      emoji: '😐'
    },
    high: {
      color: '#f97316',
      gradient: ['#f97316', '#fb923c'],
      bgColor: '#ffedd5',
      label: '高度关注',
      emoji: '😟'
    },
    critical: {
      color: '#ef4444',
      gradient: ['#ef4444', '#f87171'],
      bgColor: '#fee2e2',
      label: '重点关注',
      emoji: '😰'
    }
  };

  const config = levelConfig[level];
  const gradientId = `progress-gradient-${level}`;

  return (
    <div className="flex flex-col items-center">
      {/* 表情符号 */}
      <motion.div 
        className="text-5xl mb-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
      >
        {config.emoji}
      </motion.div>

      {/* 关注等级标签 */}
      <motion.div 
        className="px-4 py-1.5 rounded-full text-sm font-medium text-white mb-4"
        style={{ backgroundColor: config.color }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {config.label}
      </motion.div>

      {/* 半圆形进度条 */}
      <div className="relative" style={{ width: radius * 2 + strokeWidth * 2, height: radius + strokeWidth * 2 + 20 }}>
        <svg 
          width={radius * 2 + strokeWidth * 2} 
          height={radius + strokeWidth * 2 + 20}
          className="transform"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={config.gradient[0]} />
              <stop offset="100%" stopColor={config.gradient[1]} />
            </linearGradient>
          </defs>
          
          {/* 背景轨道 */}
          <path
            d={`M ${strokeWidth} ${radius + strokeWidth} A ${radius} ${radius} 0 0 1 ${radius * 2 + strokeWidth} ${radius + strokeWidth}`}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          
          {/* 进度条 */}
          <motion.path
            d={`M ${strokeWidth} ${radius + strokeWidth} A ${radius} ${radius} 0 0 1 ${radius * 2 + strokeWidth} ${radius + strokeWidth}`}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          />

          {/* 刻度标记 */}
          {[0, 25, 50, 75, 100].map((tick, index) => {
            const angle = Math.PI - (tick / 100) * Math.PI;
            const x1 = radius + strokeWidth + (radius - 20) * Math.cos(angle);
            const y1 = radius + strokeWidth - (radius - 20) * Math.sin(angle);
            const x2 = radius + strokeWidth + (radius - 10) * Math.cos(angle);
            const y2 = radius + strokeWidth - (radius - 10) * Math.sin(angle);
            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#d1d5db"
                strokeWidth={2}
                strokeLinecap="round"
              />
            );
          })}
        </svg>

        {/* 中心分数显示 */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <span 
              className="text-4xl font-bold"
              style={{ color: config.color }}
            >
              {score}
            </span>
            <span className="text-lg text-muted-foreground">/{maxScore}</span>
          </motion.div>
        </div>
      </div>

      {/* 量表名称 */}
      <motion.p 
        className="text-sm text-muted-foreground mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {scaleName}
      </motion.p>
    </div>
  );
}
