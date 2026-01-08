const pages = Array.from(document.querySelectorAll('[data-page]'))
const navHome = document.getElementById('nav-home')
const startButton = document.getElementById('start-assessment')
const scaleButtons = document.querySelectorAll('[data-scale]')
const questionText = document.getElementById('question-text')
const optionsContainer = document.getElementById('options')
const questionProgress = document.getElementById('question-progress')
const progressBar = document.getElementById('progress-bar')
const prevButton = document.getElementById('prev-question')
const saveDraftButton = document.getElementById('save-draft')
const endButton = document.getElementById('end-assessment')
const submitButton = document.getElementById('submit-assessment')
const scaleTitle = document.getElementById('scale-title')
const levelTag = document.getElementById('level-tag')
const resultTitle = document.getElementById('result-title')
const resultSummary = document.getElementById('result-summary')
const actionButtons = document.getElementById('action-buttons')
const riskAlert = document.getElementById('risk-alert')
const helpNow = document.getElementById('help-now')
const remindStatus = document.getElementById('remind-status')
const contentRecommend = document.getElementById('content-recommend')
const exportRecord = document.getElementById('export-record')
const goSelect = document.getElementById('go-select')
const placeholderTitle = document.getElementById('placeholder-title')
const placeholderDesc = document.getElementById('placeholder-desc')
const backToResult = document.getElementById('back-to-result')
const helpModal = document.getElementById('help-modal')
const closeHelp = document.getElementById('close-help')

const optionLabels = [
  { label: '完全没有', score: 0 },
  { label: '有几天', score: 1 },
  { label: '超过一半时间', score: 2 },
  { label: '几乎每天', score: 3 },
]

const scales = {
  phq9: {
    name: 'PHQ-9 抑郁自评量表',
    questions: Array.from({ length: 9 }, (_, index) => `PHQ-9 问题 ${index + 1}`),
  },
  gad7: {
    name: 'GAD-7 焦虑自评量表',
    questions: Array.from({ length: 7 }, (_, index) => `GAD-7 问题 ${index + 1}`),
  },
}

const attentionRules = {
  phq9: [
    { min: 0, max: 4, level: '绿', tag: '绿：低关注', color: 'green', summary: '无抑郁症状' },
    { min: 5, max: 9, level: '黄', tag: '黄：建议关注', color: 'yellow', summary: '轻度抑郁' },
    { min: 10, max: 14, level: '橙', tag: '橙：建议进一步评估/门诊', color: 'orange', summary: '中度抑郁' },
    { min: 15, max: 27, level: '红', tag: '红：重点关注', color: 'red', summary: '中重度及以上' },
  ],
  gad7: [
    { min: 0, max: 4, level: '绿', tag: '绿：低关注', color: 'green', summary: '无焦虑症状' },
    { min: 5, max: 9, level: '黄', tag: '黄：建议关注', color: 'yellow', summary: '轻度焦虑' },
    { min: 10, max: 14, level: '橙', tag: '橙：建议进一步评估/门诊', color: 'orange', summary: '中度焦虑' },
    { min: 15, max: 21, level: '红', tag: '红：重点关注', color: 'red', summary: '中重度焦虑' },
  ],
}

let currentScale = null
let currentIndex = 0
let answers = []

const setPage = (pageId) => {
  pages.forEach((page) => {
    page.hidden = page.id !== pageId
  })
}

const resetAssessment = () => {
  currentIndex = 0
  answers = []
}

const renderQuestion = () => {
  if (!currentScale) return
  const total = scales[currentScale].questions.length
  const question = scales[currentScale].questions[currentIndex]
  questionText.textContent = question
  questionProgress.textContent = `第 ${currentIndex + 1} / ${total} 题`
  progressBar.style.width = `${((currentIndex + 1) / total) * 100}%`

  optionsContainer.innerHTML = ''
  optionLabels.forEach((option, index) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'option'
    button.textContent = option.label
    button.dataset.score = option.score
    if (answers[currentIndex] === option.score) {
      button.classList.add('active')
    }
    button.addEventListener('click', () => {
      answers[currentIndex] = option.score
      renderQuestion()
    })
    optionsContainer.appendChild(button)
  })

  prevButton.disabled = currentIndex === 0
}

const computeResult = () => {
  const totalScore = answers.reduce((sum, value) => sum + (value ?? 0), 0)
  const rules = attentionRules[currentScale]
  const matched = rules.find((rule) => totalScore >= rule.min && totalScore <= rule.max)
  const riskFlag = currentScale === 'phq9' && (answers[8] ?? 0) > 0
  return { totalScore, matched, riskFlag }
}

const renderResult = () => {
  const { totalScore, matched, riskFlag } = computeResult()
  if (!matched) return

  levelTag.textContent = matched.tag
  levelTag.className = `level-tag ${matched.color}`
  resultTitle.textContent = `${scales[currentScale].name} 结果`
  resultSummary.textContent = `总分 ${totalScore} · ${matched.summary}`
  riskAlert.hidden = !riskFlag
  contentRecommend.hidden = !['绿', '黄'].includes(matched.level)

  actionButtons.innerHTML = ''
  const actions = getRecommendedActions(matched.level, riskFlag)
  actions.forEach((action) => {
    const button = document.createElement('button')
    button.textContent = action.label
    button.className = action.type
    button.addEventListener('click', () => openPlaceholder(action.label, action.description))
    actionButtons.appendChild(button)
  })

  remindStatus.textContent = '暂未设置'
}

const getRecommendedActions = (level, riskFlag) => {
  const mapping = {
    绿: [
      { label: '自助调适', type: 'primary', description: '跳转自助调适内容（占位）' },
      { label: '设置复评（14天）', type: 'secondary', description: '设置 14 天复评提醒（占位）' },
    ],
    黄: [
      { label: '自助调适', type: 'primary', description: '跳转自助调适内容（占位）' },
      { label: '去预约', type: 'secondary', description: '预约门诊入口（占位）' },
    ],
    橙: [
      { label: '去预约', type: 'primary', description: '预约门诊入口（占位）' },
      { label: '设置复评（7天）', type: 'secondary', description: '设置 7 天复评提醒（占位）' },
    ],
    红: [
      { label: '一键求助', type: 'danger', description: '求助入口（占位）' },
      { label: '去预约', type: 'secondary', description: '预约门诊入口（占位）' },
    ],
  }
  const actions = mapping[level] ?? []
  if (level === '红' && !riskFlag) {
    actions[0] = { label: '一键求助', type: 'danger', description: '求助入口（占位）' }
  }
  return actions
}

const openPlaceholder = (title, description) => {
  placeholderTitle.textContent = title
  placeholderDesc.textContent = description
  setPage('page-placeholder')
}

const saveDraft = () => {
  const draft = {
    scale: currentScale,
    index: currentIndex,
    answers,
  }
  localStorage.setItem('assessmentDraft', JSON.stringify(draft))
  alert('草稿已保存')
}

const loadDraft = () => {
  const raw = localStorage.getItem('assessmentDraft')
  if (!raw) return false
  const draft = JSON.parse(raw)
  if (!draft.scale || !scales[draft.scale]) return false
  currentScale = draft.scale
  currentIndex = draft.index ?? 0
  answers = draft.answers ?? []
  scaleTitle.textContent = scales[currentScale].name
  renderQuestion()
  setPage('page-assessment')
  return true
}

const exportCsv = () => {
  const { totalScore, matched, riskFlag } = computeResult()
  const row = [
    'user_id',
    'scale_type',
    'total_score',
    'score_level',
    'has_risk_flag',
    'created_at',
  ]
  const data = [
    'demo-user',
    currentScale.toUpperCase(),
    totalScore,
    matched.level,
    riskFlag,
    new Date().toISOString(),
  ]
  const csv = `${row.join(',')}\n${data.join(',')}`
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'assessment_record.csv'
  link.click()
  URL.revokeObjectURL(link.href)
}

navHome.addEventListener('click', () => {
  setPage('page-home')
})

startButton.addEventListener('click', () => {
  setPage('page-select')
})

document.querySelectorAll('[data-entry]').forEach((button) => {
  button.addEventListener('click', () => {
    setPage('page-select')
  })
})

scaleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentScale = button.dataset.scale
    resetAssessment()
    scaleTitle.textContent = scales[currentScale].name
    renderQuestion()
    setPage('page-assessment')
  })
})

prevButton.addEventListener('click', () => {
  currentIndex = Math.max(0, currentIndex - 1)
  renderQuestion()
})

saveDraftButton.addEventListener('click', saveDraft)

endButton.addEventListener('click', () => {
  if (confirm('确定结束自评并返回量表选择页？')) {
    setPage('page-select')
  }
})

submitButton.addEventListener('click', () => {
  if (answers.length < scales[currentScale].questions.length || answers.includes(undefined)) {
    alert('请完成所有题目后再提交。')
    return
  }
  renderResult()
  setPage('page-result')
})

optionsContainer.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
  }
})

document.querySelectorAll('[data-remind]').forEach((button) => {
  button.addEventListener('click', () => {
    remindStatus.textContent = `已设置 ${button.dataset.remind} 天复评提醒`
  })
})

helpNow.addEventListener('click', () => {
  helpModal.hidden = false
})

closeHelp.addEventListener('click', () => {
  helpModal.hidden = true
})

document.querySelectorAll('[data-help]').forEach((button) => {
  button.addEventListener('click', () => {
    helpModal.hidden = true
    openPlaceholder(button.textContent, '求助相关功能占位页')
  })
})

document.querySelectorAll('[data-action]').forEach((button) => {
  button.addEventListener('click', () => {
    openPlaceholder(button.textContent, '安全提示动作占位页')
  })
})

document.querySelectorAll('[data-content]').forEach((button) => {
  button.addEventListener('click', () => {
    openPlaceholder(button.textContent, '自助调节内容占位页')
  })
})

exportRecord.addEventListener('click', exportCsv)

goSelect.addEventListener('click', () => {
  setPage('page-select')
})

backToResult.addEventListener('click', () => {
  setPage('page-result')
})

if (!loadDraft()) {
  setPage('page-home')
}
