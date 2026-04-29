// 共享的颜色和类型映射工具

// 进度颜色映射
export const PROGRESS_COLORS = {
  0: '#909399',
  1: '#E6A23C',
  2: '#409EFF',
  3: '#67C23A',
  4: '#67C23A'
}

export const getProgressColor = (progress) => {
  return PROGRESS_COLORS[progress] || '#909399'
}

// 严重度颜色映射
export const SEVERITY_COLORS = {
  'S': '#F56C6C',
  'A': '#E6A23C',
  'B': '#409EFF',
  'C': '#67C23A'
}

export const getSeverityColor = (level) => {
  return SEVERITY_COLORS[level] || '#909399'
}

// 阶段标签颜色
export const STAGE_TAG_TYPES = {
  0: 'info',
  1: 'warning',
  2: 'primary',
  3: 'success'
}

export const getStageTagType = (progress) => {
  return STAGE_TAG_TYPES[progress] || 'info'
}
