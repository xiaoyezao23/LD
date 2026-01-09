/**
 * 心理测评量表数据
 * 设计风格：温暖陪伴风格
 * 色彩系统：蓝紫渐变主色，关注等级使用绿/黄/橙/红
 */

export interface Question {
  id: number;
  text: string;
}

export interface ScaleOption {
  value: number;
  label: string;
  description: string;
}

export interface Scale {
  id: string;
  name: string;
  fullName: string;
  description: string;
  duration: string;
  questions: Question[];
  options: ScaleOption[];
}

export interface LevelConfig {
  level: 'green' | 'yellow' | 'orange' | 'red';
  label: string;
  description: string;
  minScore: number;
  maxScore: number;
  recommendation: string;
  actions: {
    primary: string;
    secondary: string;
  };
}

// PHQ-9 量表题目
export const PHQ9: Scale = {
  id: 'PHQ-9',
  name: 'PHQ-9',
  fullName: 'PHQ-9 抑郁自评量表',
  description: '用于评估过去两周内抑郁症状的严重程度',
  duration: '约3分钟',
  questions: [
    { id: 1, text: '做事时提不起劲或没有兴趣' },
    { id: 2, text: '感到心情低落、沮丧或绝望' },
    { id: 3, text: '入睡困难、睡不安稳或睡眠过多' },
    { id: 4, text: '感觉疲倦或没有活力' },
    { id: 5, text: '食欲不振或吃太多' },
    { id: 6, text: '觉得自己很糟，或觉得自己很失败，或让自己或家人失望' },
    { id: 7, text: '对事物专注有困难，例如阅读报纸或看电视时' },
    { id: 8, text: '动作或说话速度缓慢到别人已经察觉，或正好相反——烦躁或坐立不安' },
    { id: 9, text: '有不如死掉或用某种方式伤害自己的念头' },
  ],
  options: [
    { value: 0, label: '完全不会', description: '过去两周内从未出现' },
    { value: 1, label: '好几天', description: '过去两周内有几天出现' },
    { value: 2, label: '一半以上的天数', description: '过去两周内超过一半天数出现' },
    { value: 3, label: '几乎每天', description: '过去两周内几乎每天都出现' },
  ],
};

// GAD-7 量表题目
export const GAD7: Scale = {
  id: 'GAD-7',
  name: 'GAD-7',
  fullName: 'GAD-7 焦虑自评量表',
  description: '用于评估过去两周内焦虑症状的严重程度',
  duration: '约3分钟',
  questions: [
    { id: 1, text: '感觉紧张、焦虑或急切' },
    { id: 2, text: '不能够停止或控制担忧' },
    { id: 3, text: '对各种各样的事情担忧过多' },
    { id: 4, text: '很难放松下来' },
    { id: 5, text: '由于不安而无法静坐' },
    { id: 6, text: '变得容易烦恼或急躁' },
    { id: 7, text: '感到似乎将有可怕的事情发生而害怕' },
  ],
  options: [
    { value: 0, label: '完全不会', description: '过去两周内从未出现' },
    { value: 1, label: '好几天', description: '过去两周内有几天出现' },
    { value: 2, label: '一半以上的天数', description: '过去两周内超过一半天数出现' },
    { value: 3, label: '几乎每天', description: '过去两周内几乎每天都出现' },
  ],
};

// PHQ-9 分层标准
export const PHQ9Levels: LevelConfig[] = [
  {
    level: 'green',
    label: '低关注',
    description: '无抑郁症状',
    minScore: 0,
    maxScore: 4,
    recommendation: '您目前的情绪状态良好，建议继续保持健康的生活方式。',
    actions: {
      primary: '自助调适',
      secondary: '设置复评提醒',
    },
  },
  {
    level: 'yellow',
    label: '建议关注',
    description: '轻度抑郁',
    minScore: 5,
    maxScore: 9,
    recommendation: '您可能存在轻度情绪困扰，建议尝试一些自我调节方法。',
    actions: {
      primary: '自助调适',
      secondary: '去预约',
    },
  },
  {
    level: 'orange',
    label: '建议进一步评估',
    description: '中度抑郁',
    minScore: 10,
    maxScore: 14,
    recommendation: '建议您寻求专业人员的进一步评估和指导。',
    actions: {
      primary: '去预约',
      secondary: '设置复评提醒',
    },
  },
  {
    level: 'red',
    label: '重点关注',
    description: '中重度及以上',
    minScore: 15,
    maxScore: 27,
    recommendation: '建议您尽快联系专业人员获取帮助和支持。',
    actions: {
      primary: '一键求助',
      secondary: '去预约',
    },
  },
];

// GAD-7 分层标准
export const GAD7Levels: LevelConfig[] = [
  {
    level: 'green',
    label: '低关注',
    description: '无焦虑症状',
    minScore: 0,
    maxScore: 4,
    recommendation: '您目前的情绪状态良好，建议继续保持健康的生活方式。',
    actions: {
      primary: '自助调适',
      secondary: '设置复评提醒',
    },
  },
  {
    level: 'yellow',
    label: '建议关注',
    description: '轻度焦虑',
    minScore: 5,
    maxScore: 9,
    recommendation: '您可能存在轻度焦虑情绪，建议尝试一些放松技巧。',
    actions: {
      primary: '自助调适',
      secondary: '去预约',
    },
  },
  {
    level: 'orange',
    label: '建议进一步评估',
    description: '中度焦虑',
    minScore: 10,
    maxScore: 14,
    recommendation: '建议您寻求专业人员的进一步评估和指导。',
    actions: {
      primary: '去预约',
      secondary: '设置复评提醒',
    },
  },
  {
    level: 'red',
    label: '重点关注',
    description: '中重度焦虑',
    minScore: 15,
    maxScore: 21,
    recommendation: '建议您尽快联系专业人员获取帮助和支持。',
    actions: {
      primary: '一键求助',
      secondary: '去预约',
    },
  },
];

// 自助调节内容
export interface SelfHelpContent {
  id: string;
  title: string;
  type: string;
  description: string;
  duration: string;
  image: string;
  targetLevels: ('green' | 'yellow')[];
}

export const selfHelpContents: SelfHelpContent[] = [
  {
    id: 'meditation',
    title: '舒缓冥想',
    type: '冥想呼吸',
    description: '通过引导式冥想，帮助您放松身心，缓解压力',
    duration: '5分钟',
    image: '/images/meditation-card.png',
    targetLevels: ['green', 'yellow'],
  },
  {
    id: 'breathing',
    title: '呼吸训练',
    type: '呼吸训练',
    description: '学习腹式呼吸技巧，快速平复焦虑情绪',
    duration: '3分钟',
    image: '/images/breathing-card.png',
    targetLevels: ['green', 'yellow'],
  },
  {
    id: 'exercise',
    title: '简易瑜伽',
    type: '简易运动',
    description: '轻柔的伸展动作，释放身体紧张感',
    duration: '10分钟',
    image: '/images/exercise-card.png',
    targetLevels: ['green', 'yellow'],
  },
];

// 获取量表
export function getScale(scaleId: string): Scale | undefined {
  if (scaleId === 'PHQ-9') return PHQ9;
  if (scaleId === 'GAD-7') return GAD7;
  return undefined;
}

// 获取分层配置
export function getLevelConfig(scaleId: string, score: number): LevelConfig | undefined {
  const levels = scaleId === 'PHQ-9' ? PHQ9Levels : GAD7Levels;
  return levels.find((l) => score >= l.minScore && score <= l.maxScore);
}

// 检查是否触发安全提示（PHQ-9第9题）
export function checkRiskFlag(scaleId: string, answers: number[]): boolean {
  if (scaleId === 'PHQ-9' && answers.length >= 9) {
    return answers[8] > 0;
  }
  return false;
}
