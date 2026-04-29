import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const useProblemStore = defineStore('problem', () => {
  // 问题等级选项
  const problemLevels = ['S', 'A', 'B', 'C']

  // 问题状态选项
  const problemStatuses = ['待分发', '处理中', '待验证', '已关闭']

  // 问题来源
  const problemSources = ['生产过程', '市场反馈', '来料检验', 'MES系统', '过程检验', '售后维修']

  // 问题阶段
  const problemPhases = ['项目阶段', '量产阶段']

  // 问题归属
  const problemOwnerships = ['设计问题', '制造问题']

  // 问题列表
  const problemList = ref([
    { id: 1, problemNo: 'Q2024-001', title: '焊接不良导致气密性不合格', level: 'S', status: '处理中', dept: '生产部', source: '生产过程', phase: '量产阶段', ownership: '制造问题', createTime: '2024-04-01', assignee: '张工', deadline: '2024-04-15', progress: 2, description: '焊接工位气密性不合格率上升至3%', rejectCount: 0 },
    { id: 2, problemNo: 'Q2024-002', title: '来料尺寸超差', level: 'A', status: '待分发', dept: '采购部', source: '来料检验', phase: '量产阶段', ownership: '制造问题', createTime: '2024-04-02', assignee: '李工', deadline: '2024-04-18', progress: 0, description: '某批次来料尺寸超出规格上限', rejectCount: 0 },
    { id: 3, problemNo: 'Q2024-003', title: '涂装气泡问题', level: 'B', status: '已关闭', dept: '涂装部', source: '市场反馈', phase: '量产阶段', ownership: '制造问题', createTime: '2024-03-28', assignee: '王工', deadline: '2024-04-05', progress: 4, description: '市场反馈涂装表面有气泡', rejectCount: 1 },
    { id: 4, problemNo: 'Q2024-004', title: '扭矩数据异常', level: 'A', status: '处理中', dept: '质量部', source: 'MES系统', phase: '量产阶段', ownership: '制造问题', createTime: '2024-04-03', assignee: '刘工', deadline: '2024-04-20', progress: 1, description: '扭矩监控系统检测到数据异常波动', rejectCount: 0 },
    { id: 5, problemNo: 'Q2024-005', title: '零部件装配偏差', level: 'C', status: '待验证', dept: '生产部', source: '过程检验', phase: '项目阶段', ownership: '设计问题', createTime: '2024-04-05', assignee: '陈工', deadline: '2024-04-12', progress: 3, description: '装配过程中发现零部件配合间隙过大', rejectCount: 0 }
  ])

  // 问题处理进度 (4阶段)
  const problemStages = [
    { stage: 0, name: '原因分析', icon: 'Search', color: 'info' },
    { stage: 1, name: '短期措施', icon: 'Clock', color: 'warning' },
    { stage: 2, name: '长期措施', icon: 'Timer', color: 'primary' },
    { stage: 3, name: '验证关闭', icon: 'Checked', color: 'success' }
  ]

  // 获取状态类型
  const getStatusType = (status) => {
    const map = { '待分发': 'info', '处理中': 'warning', '待验证': 'primary', '已关闭': 'success' }
    return map[status] || ''
  }

  // 获取等级类型
  const getLevelType = (level) => {
    const map = { 'S': 'danger', 'A': 'warning', 'B': 'info', 'C': 'success' }
    return map[level] || ''
  }

  // 获取问题进度状态图标
  const getProgressIcon = (progress) => {
    if (progress >= 4) return 'Checked'
    if (progress >= 3) return 'Timer'
    if (progress >= 1) return 'Clock'
    return 'Search'
  }

  // 创建新问题
  const createProblem = (problem) => {
    const ids = problemList.value.map(p => p.id)
    const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1
    const newNo = `Q2024-${String(newId).padStart(3, '0')}`
    problemList.value.push({
      id: newId,
      problemNo: newNo,
      ...problem,
      progress: 0,
      rejectCount: 0
    })
    return newNo
  }

  // 更新问题状态
  const updateProblemStatus = (problemNo, status) => {
    const problem = problemList.value.find(p => p.problemNo === problemNo)
    if (problem) {
      problem.status = status
    }
  }

  // 更新问题进度
  const updateProblemProgress = (problemNo, progress) => {
    const problem = problemList.value.find(p => p.problemNo === problemNo)
    if (problem) {
      problem.progress = Math.min(progress, 4)
    }
  }

  // 延期申请列表
  const extensionRequests = ref([
    { id: 1, problemNo: 'Q2024-001', originalDeadline: '2024-04-15', newDeadline: '2024-04-20', reason: '需要等待供应商答复', status: '待审批', applicant: '张工', applyDate: '2024-04-12' }
  ])

  return {
    problemLevels,
    problemStatuses,
    problemSources,
    problemPhases,
    problemOwnerships,
    problemList,
    problemStages,
    extensionRequests,
    getStatusType,
    getLevelType,
    getProgressIcon,
    createProblem,
    updateProblemStatus,
    updateProblemProgress
  }
})
