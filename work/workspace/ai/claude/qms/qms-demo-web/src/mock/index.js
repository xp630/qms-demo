// Mock数据 - 模拟QMS系统各模块数据

// ============ 统计数据 ============
export const dashboardStats = {
  machineCount: 1256,
  pendingProblems: 23,
  fpyRate: 98.5,
  dpu: 2.3,
  defectRate: 1.2,
  auditPending: 8
}

// ============ 机台数据 ============
export const machineList = [
  { id: 1, machineNo: 'M20240001', planNo: 'P2024-01', model: '类型A', totalCount: 1256, fpyRate: 98.5, status: '正常', configCode: 'CFG-A001', createTime: '2024-01-15' },
  { id: 2, machineNo: 'M20240002', planNo: 'P2024-01', model: '类型B', totalCount: 890, fpyRate: 97.2, status: '正常', configCode: 'CFG-B002', createTime: '2024-01-16' },
  { id: 3, machineNo: 'M20240003', planNo: 'P2024-02', model: '类型A', totalCount: 756, fpyRate: 99.1, status: '维护中', configCode: 'CFG-A001', createTime: '2024-02-01' },
  { id: 4, machineNo: 'M20240004', planNo: 'P2024-02', model: '类型C', totalCount: 543, fpyRate: 96.8, status: '正常', configCode: 'CFG-C003', createTime: '2024-02-10' },
  { id: 5, machineNo: 'M20240005', planNo: 'P2024-03', model: '类型B', totalCount: 1200, fpyRate: 98.2, status: '正常', configCode: 'CFG-B002', createTime: '2024-03-05' },
  { id: 6, machineNo: 'M20240006', planNo: 'P2024-03', model: '类型A', totalCount: 980, fpyRate: 97.5, status: '异常', configCode: 'CFG-A001', createTime: '2024-03-12' },
  { id: 7, machineNo: 'M20240007', planNo: 'P2024-04', model: '类型C', totalCount: 650, fpyRate: 99.3, status: '正常', configCode: 'CFG-C003', createTime: '2024-04-01' },
  { id: 8, machineNo: 'M20240008', planNo: 'P2024-04', model: '类型B', totalCount: 430, fpyRate: 95.6, status: '正常', configCode: 'CFG-B002', createTime: '2024-04-15' }
]

// ============ 问题数据 ============
export const problemList = [
  { id: 1, problemNo: 'Q2024-001', title: '焊接不良导致气密性不合格', level: 'S', status: '处理中', dept: '生产部', source: '生产过程', createTime: '2024-04-01', assignee: '张工' },
  { id: 2, problemNo: 'Q2024-002', title: '来料尺寸超差', level: 'A', status: '待分发', dept: '采购部', source: '来料检验', createTime: '2024-04-02', assignee: '李工' },
  { id: 3, problemNo: 'Q2024-003', title: '涂装气泡问题', level: 'B', status: '已关闭', dept: '涂装部', source: '市场反馈', createTime: '2024-03-28', assignee: '王工' },
  { id: 4, problemNo: 'Q2024-004', title: '扭矩数据异常', level: 'A', status: '处理中', dept: '质量部', source: 'MES系统', createTime: '2024-04-03', assignee: '刘工' },
  { id: 5, problemNo: 'Q2024-005', title: '零部件装配偏差', level: 'C', status: '待验证', dept: '生产部', source: '过程检验', createTime: '2024-04-05', assignee: '陈工' }
]

// ============ 缺陷数据 ============
export const defectList = [
  { id: 1, defectNo: 'D2024-001', machineNo: 'M20240001', defectType: '气密性不良', count: 23, severity: '高', findTime: '2024-04-06 10:30', status: '已返修' },
  { id: 2, defectNo: 'D2024-002', machineNo: 'M20240002', defectType: '外观划伤', count: 18, severity: '中', findTime: '2024-04-06 11:20', status: '处理中' },
  { id: 3, defectNo: 'D2024-003', machineNo: 'M20240005', defectType: '扭矩不足', count: 15, severity: '高', findTime: '2024-04-06 14:15', status: '已返修' },
  { id: 4, defectNo: 'D2024-004', machineNo: 'M20240003', defectType: '尺寸超差', count: 12, severity: '中', findTime: '2024-04-07 09:00', status: '待分析' },
  { id: 5, defectNo: 'D2024-005', machineNo: 'M20240006', defectType: '装配不良', count: 10, severity: '低', findTime: '2024-04-07 10:45', status: '处理中' }
]

// ============ FPY趋势数据 ============
export const fpyTrendData = {
  months: ['1月', '2月', '3月', '4月'],
  actual: [97.2, 97.8, 98.1, 98.5],
  target: [98.0, 98.0, 98.0, 98.0]
}

// ============ DPU趋势数据 ============
export const dpuTrendData = {
  months: ['1月', '2月', '3月', '4月'],
  actual: [3.2, 2.9, 2.5, 2.3],
  target: [2.5, 2.5, 2.5, 2.5]
}

// ============ 待办任务 ============
export const todoList = [
  { id: 1, title: '审核M20240006偏差申请', type: '待审批', level: '紧急', deadline: '2024-04-08' },
  { id: 2, title: '确认焊接工位返修结果', type: '待验证', level: '重要', deadline: '2024-04-09' },
  { id: 3, title: '更新APQP进度报告', type: '待处理', level: '普通', deadline: '2024-04-10' },
  { id: 4, title: '批准扭矩校准计划', type: '待审批', level: '重要', deadline: '2024-04-08' },
  { id: 5, title: '复核来料检验报告', type: '待处理', level: '普通', deadline: '2024-04-11' }
]

// ============ 缺陷TOP10 ============
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

// ============ 文件数据 ============
export const documentList = [
  { id: 1, docNo: 'QMS-001', title: '质量手册', version: 'V3.2', dept: '质量部', updateTime: '2024-03-15', status: '有效' },
  { id: 2, docNo: 'QMS-002', title: '程序文件-不合格品控制', version: 'V2.1', dept: '质量部', updateTime: '2024-02-20', status: '有效' },
  { id: 3, docNo: 'QMS-003', title: '作业指导书-焊接工序', version: 'V1.5', dept: '生产部', updateTime: '2024-03-01', status: '有效' },
  { id: 4, docNo: 'QMS-004', title: '检验标准-来料检验', version: 'V2.3', dept: '质量部', updateTime: '2024-01-10', status: '修订中' },
  { id: 5, docNo: 'QMS-005', title: '设备维护规程', version: 'V1.2', dept: '设备部', updateTime: '2024-02-28', status: '有效' }
]

// ============ 审核记录 ============
export const auditRecords = [
  { id: 1, auditNo: 'A2024-001', type: '过程审核', dept: '焊装车间', auditor: '质量部', auditDate: '2024-03-20', status: '已完成', issues: 3 },
  { id: 2, auditNo: 'A2024-002', type: '产品审核', dept: '总装车间', auditor: '质量部', auditDate: '2024-03-25', status: '已完成', issues: 1 },
  { id: 3, auditNo: 'A2024-003', type: '体系审核', dept: '全厂', auditor: '外审机构', auditDate: '2024-04-01', status: '待整改', issues: 5 }
]

// ============ 计量设备 ============
export const equipmentList = [
  { id: 1, equipNo: 'ME-001', name: '三坐标测量仪', model: 'CMM-500', dept: '质检室', calibrationDate: '2024-01-15', nextDate: '2025-01-15', status: '正常' },
  { id: 2, equipNo: 'ME-002', name: '硬度计', model: 'HR-150A', dept: '质检室', calibrationDate: '2024-02-10', nextDate: '2024-08-10', status: '正常' },
  { id: 3, equipNo: 'ME-003', name: '扭矩扳手', model: 'TB-50', dept: '生产部', calibrationDate: '2024-03-05', nextDate: '2024-09-05', status: '临期' },
  { id: 4, equipNo: 'ME-004', name: '光谱仪', model: 'SP-800', dept: '质检室', calibrationDate: '2024-01-20', nextDate: '2025-01-20', status: '正常' }
]

// ============ 供应商数据 ============
export const supplierList = [
  { id: 1, supplierNo: 'S001', name: '宏伟供应商', level: 'A', apqpStatus: '进行中', ppapStatus: '已批准', score: 92 },
  { id: 2, supplierNo: 'S002', name: '振兴供应商', level: 'B', apqpStatus: '已关闭', ppapStatus: '已批准', score: 85 },
  { id: 3, supplierNo: 'S003', name: '创新供应商', level: 'A', apqpStatus: '进行中', ppapStatus: '待提交', score: 88 }
]
