// MQM 模块 Mock 数据 - 市场质量管理

// 技术报告数据
export const techReportList = [
  { id: 1, reportNo: 'TR2024-001', machineNo: 'M20240001', reportType: '市场质量问题报告', createDate: '2024-04-01', status: '已提交', author: '市场部', summary: '客户反馈气密性问题' },
  { id: 2, reportNo: 'TR2024-002', machineNo: 'M20240002', reportType: '技术分析报告', createDate: '2024-04-03', status: '处理中', author: '技术部', summary: '扭矩异常原因分析' }
]

// 问题索赔数据
export const claimList = [
  { id: 1, claimNo: 'CL2024-001', machineNo: 'M20240001', claimType: '质量问题索赔', amount: 5000, status: '待处理', claimDate: '2024-04-01', customer: '顾客A' },
  { id: 2, claimNo: 'CL2024-002', machineNo: 'M20240003', claimType: '维修费用索赔', amount: 3000, status: '已结案', claimDate: '2024-03-25', customer: '顾客B' },
  { id: 3, claimNo: 'CL2024-003', machineNo: 'M20240005', claimType: '退货索赔', amount: 15000, status: '处理中', claimDate: '2024-04-02', customer: '顾客C' }
]

// 机台调查数据
export const surveyList = [
  { id: 1, surveyNo: 'SV2024-001', machineNo: 'M20240001', surveyType: '现场调查', createDate: '2024-04-01', status: '进行中', surveyor: '王工', findings: '气密性不良问题现场确认' },
  { id: 2, surveyNo: 'SV2024-002', machineNo: 'M20240005', surveyType: '返修调查', createDate: '2024-04-02', status: '已完成', surveyor: '李工', findings: '返修后功能正常' }
]

// 数据分析数据
export const mqmDataAnalysisList = [
  { month: '1月', claimCount: 12, claimAmount: 45000, returnRate: 0.8, satisfaction: 92 },
  { month: '2月', claimCount: 8, claimAmount: 32000, returnRate: 0.6, satisfaction: 94 },
  { month: '3月', claimCount: 15, claimAmount: 58000, returnRate: 1.2, satisfaction: 90 },
  { month: '4月', claimCount: 10, claimAmount: 41000, returnRate: 0.7, satisfaction: 93 }
]

// 客户投诉类型统计
export const complaintTypeStat = [
  { type: '质量问题', count: 25, percentage: 45 },
  { type: '服务问题', count: 15, percentage: 27 },
  { type: '交付问题', count: 10, percentage: 18 },
  { type: '其他', count: 5, percentage: 10 }
]
