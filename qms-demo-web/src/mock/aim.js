// AIM 模块 Mock 数据 - 问题改进管理

// 问题管理数据
export const aimProblemList = [
  { id: 1, problemNo: 'AIM2024-001', title: '焊接不良改善', level: 'A', status: '进行中', owner: '张三', deadline: '2024-04-15', progress: 65, dept: '生产部' },
  { id: 2, problemNo: 'AIM2024-002', title: '扭矩超差改善', level: 'B', status: '待验证', owner: '李四', deadline: '2024-04-20', progress: 90, dept: '质量部' },
  { id: 3, problemNo: 'AIM2024-003', title: '装配精度改善', level: 'B', status: '已关闭', owner: '王五', deadline: '2024-03-30', progress: 100, dept: '技术部' }
]

// 问题检索数据
export const aimSearchResult = [
  { id: 1, problemNo: 'AIM2024-001', title: '焊接不良改善', level: 'A', status: '进行中', createDate: '2024-03-15', dept: '生产部' },
  { id: 2, problemNo: 'AIM2023-008', title: '装配精度改善', level: 'B', status: '已关闭', createDate: '2023-11-20', dept: '技术部' },
  { id: 3, problemNo: 'AIM2023-005', title: '尺寸超差改善', level: 'A', status: '已关闭', createDate: '2023-08-10', dept: '生产部' }
]

// 统计分析数据
export const aimStatData = [
  { month: '1月', newProblems: 5, closedProblems: 4, closureRate: 80, avgDays: 12 },
  { month: '2月', newProblems: 3, closedProblems: 5, closureRate: 100, avgDays: 10 },
  { month: '3月', newProblems: 7, closedProblems: 6, closureRate: 86, avgDays: 15 },
  { month: '4月', newProblems: 4, closedProblems: 3, closureRate: 75, avgDays: 8 }
]

// 状态管理数据
export const aimStatusList = [
  { id: 1, statusName: '待分发', count: 2, color: 'warning' },
  { id: 2, statusName: '进行中', count: 8, color: 'primary' },
  { id: 3, statusName: '待验证', count: 3, color: 'info' },
  { id: 4, statusName: '已关闭', count: 25, color: 'success' }
]

// 时间管理数据
export const aimTimeList = [
  { id: 1, problemNo: 'AIM2024-001', createTime: '2024-03-15', targetCloseTime: '2024-04-15', actualCloseTime: '-', onTime: '待评估', overdueDays: 0 },
  { id: 2, problemNo: 'AIM2024-002', createTime: '2024-03-20', targetCloseTime: '2024-04-20', actualCloseTime: '-', onTime: '待评估', overdueDays: 0 },
  { id: 3, problemNo: 'AIM2023-008', createTime: '2023-11-01', targetCloseTime: '2023-12-01', actualCloseTime: '2023-11-28', onTime: '是', overdueDays: 0 }
]

// 问题等级分布
export const aimLevelStat = [
  { level: 'S', count: 2, percentage: 5 },
  { level: 'A', count: 8, percentage: 20 },
  { level: 'B', count: 15, percentage: 37 },
  { level: 'C', count: 12, percentage: 30 },
  { level: 'D', count: 3, percentage: 8 }
]
