// SQM 模块 Mock 数据 - 供应商质量管理

// APQP 数据
export const apqpList = [
  { id: 1, apqpNo: 'APQP2024-001', supplierName: '宏伟供应商', productName: 'ECU模块', phase: '设计验证', progress: 60, status: '进行中', startDate: '2024-01-15', endDate: '2024-06-30' },
  { id: 2, apqpNo: 'APQP2024-002', supplierName: '振兴供应商', productName: '电池包', phase: '过程开发', progress: 80, status: '进行中', startDate: '2024-02-01', endDate: '2024-05-31' },
  { id: 3, apqpNo: 'APQP2023-008', supplierName: '创新供应商', productName: '扭矩传感器', phase: '已关闭', progress: 100, status: '已完成', startDate: '2023-06-01', endDate: '2023-12-31' }
]

// PPAP 数据
export const ppapList = [
  { id: 1, ppapNo: 'PPAP2024-001', supplierName: '宏伟供应商', partName: 'ECU模块', level: 'Level 3', submitDate: '2024-03-15', status: '已批准', approveDate: '2024-03-20' },
  { id: 2, ppapNo: 'PPAP2024-002', supplierName: '创新供应商', partName: '扭矩传感器', level: 'Level 2', submitDate: '2024-04-01', status: '待审批', approveDate: '' },
  { id: 3, ppapNo: 'PPAP2024-003', supplierName: '振兴供应商', partName: '电池包', level: 'Level 4', submitDate: '2024-04-03', status: '待提交', approveDate: '' }
]

// 绩效管理数据
export const performanceList = [
  { id: 1, supplierNo: 'S001', supplierName: '宏伟供应商', qualityScore: 92, deliveryScore: 88, totalScore: 90, level: 'A', trend: '上升' },
  { id: 2, supplierNo: 'S002', supplierName: '振兴供应商', qualityScore: 85, deliveryScore: 82, totalScore: 83, level: 'B', trend: '持平' },
  { id: 3, supplierNo: 'S003', supplierName: '创新供应商', qualityScore: 88, deliveryScore: 90, totalScore: 89, level: 'A', trend: '上升' },
  { id: 4, supplierNo: 'S004', supplierName: '新兴供应商', qualityScore: 72, deliveryScore: 78, totalScore: 75, level: 'C', trend: '下降' }
]

// 来料检验数据
export const incomingInspectionList = [
  { id: 1, inspectNo: 'IQC2024-001', supplierName: '宏伟供应商', partName: 'ECU模块', inspectDate: '2024-04-01', quantity: 100, qualified: 98, status: '合格', inspector: '质检员A' },
  { id: 2, inspectNo: 'IQC2024-002', supplierName: '振兴供应商', partName: '电池包', inspectDate: '2024-04-02', quantity: 50, qualified: 50, status: '合格', inspector: '质检员B' },
  { id: 3, inspectNo: 'IQC2024-003', supplierName: '创新供应商', partName: '扭矩传感器', inspectDate: '2024-04-03', quantity: 80, qualified: 76, status: '待处理', inspector: '质检员A' }
]

// PPAP 提交要求
export const ppapRequirements = {
  levels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'],
  documents: ['零件提交保证书', '外观批准报告', '尺寸结果', '材料/性能试验结果', '过程流程图', 'PFMEA', '过程能力报告', 'MSA研究', '初始过程能力研究', '实验室测试报告', '外观检测报告', '生产件样品', '标准样品', '检查辅具', '客户特殊要求']
}
