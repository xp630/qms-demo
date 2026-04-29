// DASHBOARD 模块 Mock 数据 - 首页统计数据

// 统计数据
export const dashboardStats = {
  machineCount: 1256,
  pendingProblems: 23,
  fpyRate: 98.5,
  dpu: 2.3,
  defectRate: 1.2,
  auditPending: 8
}

// FPY趋势数据
export const fpyTrendData = {
  months: ['1月', '2月', '3月', '4月'],
  actual: [97.2, 97.8, 98.1, 98.5],
  target: [98.0, 98.0, 98.0, 98.0]
}

// DPU趋势数据
export const dpuTrendData = {
  months: ['1月', '2月', '3月', '4月'],
  actual: [3.2, 2.9, 2.5, 2.3],
  target: [2.5, 2.5, 2.5, 2.5]
}

// 待办任务
export const todoList = [
  { id: 1, title: '审核M20240006偏差申请', type: '待审批', level: '紧急', deadline: '2024-04-08', module: 'DAM' },
  { id: 2, title: '确认焊接工位返修结果', type: '待验证', level: '重要', deadline: '2024-04-09', module: 'QIM' },
  { id: 3, title: '更新APQP进度报告', type: '待处理', level: '普通', deadline: '2024-04-10', module: 'SQM' },
  { id: 4, title: '批准扭矩校准计划', type: '待审批', level: '重要', deadline: '2024-04-08', module: 'GAM' },
  { id: 5, title: '复核来料检验报告', type: '待处理', level: '普通', deadline: '2024-04-11', module: 'OUTBOUND' }
]

// 缺陷TOP10
export const defectTop10 = [
  { rank: 1, type: '气密性不良', count: 156, trend: '上升' },
  { rank: 2, type: '外观划伤', count: 134, trend: '持平' },
  { rank: 3, type: '扭矩不足', count: 98, trend: '下降' },
  { rank: 4, type: '尺寸超差', count: 87, trend: '上升' },
  { rank: 5, type: '装配不良', count: 76, trend: '下降' },
  { rank: 6, type: '涂装气泡', count: 65, trend: '持平' },
  { rank: 7, type: '焊接不良', count: 54, trend: '下降' },
  { rank: 8, type: '密封圈漏装', count: 43, trend: '上升' },
  { rank: 9, type: '零件错装', count: 32, trend: '持平' },
  { rank: 10, type: '其他', count: 28, trend: '下降' }
]

// 模块统计
export const moduleStats = [
  { moduleName: 'PQM', pendingCount: 5, todayIncrease: 2 },
  { moduleName: 'QIM', pendingCount: 8, todayIncrease: 1 },
  { moduleName: 'DAM', pendingCount: 3, todayIncrease: 1 },
  { moduleName: 'MQM', pendingCount: 4, todayIncrease: 0 },
  { moduleName: 'SQM', pendingCount: 2, todayIncrease: 0 }
]
