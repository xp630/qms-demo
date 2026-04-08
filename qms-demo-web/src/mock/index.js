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

// ============ 偏差数据 ============
export const damApproveList = [
  { id: 1, damNo: 'DA2024-001', description: '焊接参数偏移', applicant: '张三', applyDate: '2024-04-01', status: '待审批' },
  { id: 2, damNo: 'DA2024-002', description: '来料尺寸超差', applicant: '李四', applyDate: '2024-04-02', status: '待审批' }
]

export const damRecordList = [
  { id: 1, damNo: 'DA2024-001', description: '焊接参数偏移', status: '已关闭', createDate: '2024-03-15', closeDate: '2024-03-20' },
  { id: 2, damNo: 'DA2023-015', description: '涂装温度异常', status: '已关闭', createDate: '2023-12-10', closeDate: '2023-12-15' }
]

// ============ 测量数据 ============
export const measurePlanList = [
  { id: 1, planNo: 'MP2024-001', planDate: '2024-04-01', model: '类型A', items: 12, status: '进行中' },
  { id: 2, planNo: 'MP2024-002', planDate: '2024-04-03', model: '类型B', items: 8, status: '已完成' },
  { id: 3, planNo: 'MP2024-003', planDate: '2024-04-05', model: '类型C', items: 15, status: '进行中' }
]

export const measureDataList = [
  { id: 1, measureNo: 'MD2024-001', partNo: 'P-001', pointCount: 24, qualified: 23, rate: '98.5%' },
  { id: 2, measureNo: 'MD2024-002', partNo: 'P-002', pointCount: 18, qualified: 18, rate: '100%' },
  { id: 3, measureNo: 'MD2024-003', partNo: 'P-003', pointCount: 30, qualified: 29, rate: '96.7%' }
]

export const measureIssueList = [
  { id: 1, issueNo: 'MI2024-001', partNo: 'P-001', dimension: '长度100mm', deviation: '+0.05mm', severity: '高' },
  { id: 2, issueNo: 'MI2024-002', partNo: 'P-002', dimension: '宽度50mm', deviation: '-0.03mm', severity: '中' }
]

// ============ 市场质量数据 ============
export const techReportList = [
  { id: 1, reportNo: 'TR2024-001', machineNo: 'M20240001', reportType: '市场质量问题报告', createDate: '2024-04-01', status: '已提交' },
  { id: 2, reportNo: 'TR2024-002', machineNo: 'M20240002', reportType: '技术分析报告', createDate: '2024-04-03', status: '处理中' }
]

export const claimList = [
  { id: 1, claimNo: 'CL2024-001', machineNo: 'M20240001', claimType: '质量问题索赔', amount: 5000, status: '待处理' },
  { id: 2, claimNo: 'CL2024-002', machineNo: 'M20240003', claimType: '维修费用索赔', amount: 3000, status: '已结案' }
]

export const surveyList = [
  { id: 1, surveyNo: 'SV2024-001', machineNo: 'M20240001', surveyType: '现场调查', createDate: '2024-04-01', status: '进行中' },
  { id: 2, surveyNo: 'SV2024-002', machineNo: 'M20240005', surveyType: '返修调查', createDate: '2024-04-02', status: '已完成' }
]

export const mqmDataAnalysisList = [
  { month: '1月', claimCount: 12, claimAmount: 45000, returnRate: 0.8 },
  { month: '2月', claimCount: 8, claimAmount: 32000, returnRate: 0.6 },
  { month: '3月', claimCount: 15, claimAmount: 58000, returnRate: 1.2 },
  { month: '4月', claimCount: 10, claimAmount: 41000, returnRate: 0.7 }
]

// ============ 计量设备数据 ============
export const calibrationList = [
  { id: 1, calibNo: 'CAL2024-001', equipNo: 'ME-001', equipName: '三坐标测量仪', calibrationDate: '2024-03-01', nextDate: '2024-09-01', status: '正常' },
  { id: 2, calibNo: 'CAL2024-002', equipNo: 'ME-002', equipName: '硬度计', calibrationDate: '2024-03-15', nextDate: '2024-09-15', status: '正常' }
]

export const gaugeList = [
  { id: 1, gaugeNo: 'GG-001', name: '通止规', type: '长度类', dept: '质检室', lastCheck: '2024-03-01', nextCheck: '2024-06-01', status: '正常' },
  { id: 2, gaugeNo: 'GG-002', name: '螺纹塞规', type: '螺纹类', dept: '生产部', lastCheck: '2024-03-10', nextCheck: '2024-06-10', status: '正常' }
]

// ============ SQM数据 ============
export const apqpList = [
  { id: 1, apqpNo: 'APQP2024-001', supplierName: '宏伟供应商', productName: 'ECU模块', phase: '设计验证', progress: 60, status: '进行中' },
  { id: 2, apqpNo: 'APQP2024-002', supplierName: '振兴供应商', productName: '电池包', phase: '过程开发', progress: 80, status: '进行中' }
]

export const ppapList = [
  { id: 1, ppapNo: 'PPAP2024-001', supplierName: '宏伟供应商', partName: 'ECU模块', level: 'Level 3', submitDate: '2024-03-15', status: '已批准' },
  { id: 2, ppapNo: 'PPAP2024-002', supplierName: '创新供应商', partName: '扭矩传感器', level: 'Level 2', submitDate: '2024-04-01', status: '待审批' }
]

export const performanceList = [
  { id: 1, supplierNo: 'S001', supplierName: '宏伟供应商', qualityScore: 92, deliveryScore: 88, totalScore: 90, level: 'A' },
  { id: 2, supplierNo: 'S002', supplierName: '振兴供应商', qualityScore: 85, deliveryScore: 82, totalScore: 83, level: 'B' },
  { id: 3, supplierNo: 'S003', supplierName: '创新供应商', qualityScore: 88, deliveryScore: 90, totalScore: 89, level: 'A' }
]

// ============ 实验室数据 ============
export const testList = [
  { id: 1, testNo: 'TE2024-001', productName: '电池包', testType: '安全测试', applicant: '张三', applyDate: '2024-04-01', status: '待接收' },
  { id: 2, testNo: 'TE2024-002', productName: 'ECU模块', testType: '性能测试', applicant: '李四', applyDate: '2024-04-02', status: '进行中' }
]

export const labReportList = [
  { id: 1, reportNo: 'LR2024-001', testNo: 'TE2024-001', conclusion: '合格', reportDate: '2024-04-05', auditor: '王工' },
  { id: 2, reportNo: 'LR2024-002', testNo: 'TE2023-015', conclusion: '不合格', reportDate: '2023-12-20', auditor: '赵工' }
]

// ============ PAM数据 ============
export const processAuditList = [
  { id: 1, auditNo: 'PA2024-001', dept: '焊装车间', auditDate: '2024-03-20', auditor: '质量部', issues: 3, status: '已完成' },
  { id: 2, auditNo: 'PA2024-002', dept: '涂装车间', auditDate: '2024-03-25', auditor: '质量部', issues: 2, status: '已完成' }
]

export const customerAuditList = [
  { id: 1, auditNo: 'CA2024-001', customerName: '顾客A', auditType: '第二方审核', auditDate: '2024-03-28', result: '通过', issues: 1 },
  { id: 2, auditNo: 'CA2024-002', customerName: '顾客B', auditType: '供应商调查', auditDate: '2024-04-01', result: '待整改', issues: 4 }
]

export const spotCheckList = [
  { id: 1, checkNo: 'SC2024-001', productName: '类型A产品', checkDate: '2024-04-01', sampleSize: 50, qualified: 48, rate: '96%', result: '通过' },
  { id: 2, checkNo: 'SC2024-002', productName: '类型B产品', checkDate: '2024-04-03', sampleSize: 50, qualified: 47, rate: '94%', result: '待改进' }
]

// ============ 机台溯源数据 ============
export const productionInfoList = [
  { id: 1, machineNo: 'M20240001', productName: '类型A', output: 1200, qualified: 1180, fpy: 98.3, productionDate: '2024-04-01' },
  { id: 2, machineNo: 'M20240002', productName: '类型B', output: 980, qualified: 960, fpy: 98.0, productionDate: '2024-04-01' }
]

export const batteryList = [
  { id: 1, batteryNo: 'BAT20240001', machineNo: 'M20240001', voltage: 48, capacity: 100, status: '正常使用', productionDate: '2024-03-15' },
  { id: 2, batteryNo: 'BAT20240002', machineNo: 'M20240002', voltage: 48, capacity: 95, status: '正常使用', productionDate: '2024-03-16' }
]

export const saleInfoList = [
  { id: 1, saleNo: 'SO2024-001', machineNo: 'M20240001', customerName: '顾客A', saleDate: '2024-03-20', quantity: 10, amount: 500000 },
  { id: 2, saleNo: 'SO2024-002', machineNo: 'M20240002', customerName: '顾客B', saleDate: '2024-03-22', quantity: 5, amount: 250000 }
]

// ============ 扭矩数据 ============
export const torqueSyncList = [
  { id: 1, syncNo: 'TS2024-001', machineNo: 'M20240001', syncTime: '2024-04-01 10:00', dataCount: 1200, status: '已完成' },
  { id: 2, syncNo: 'TS2024-002', machineNo: 'M20240002', syncTime: '2024-04-01 14:00', dataCount: 980, status: '进行中' }
]

export const torqueProcessList = [
  { id: 1, processNo: 'TP2024-001', dataNo: 'TS2024-001', processType: '数据分析', startTime: '2024-04-01 10:30', status: '已完成' },
  { id: 2, processNo: 'TP2024-002', dataNo: 'TS2024-002', processType: '异常检测', startTime: '2024-04-01 14:30', status: '进行中' }
]

export const torqueStatList = [
  { month: '1月', avgTorque: 25.3, minTorque: 22.1, maxTorque: 28.5, qualifiedRate: 98.2 },
  { month: '2月', avgTorque: 25.5, minTorque: 22.5, maxTorque: 28.2, qualifiedRate: 98.5 },
  { month: '3月', avgTorque: 25.2, minTorque: 21.8, maxTorque: 28.8, qualifiedRate: 97.9 },
  { month: '4月', avgTorque: 25.4, minTorque: 22.0, maxTorque: 28.6, qualifiedRate: 98.6 }
]

// ============ AIM数据 ============
export const aimProblemList = [
  { id: 1, problemNo: 'AIM2024-001', title: '焊接不良改善', level: 'A', status: '进行中', owner: '张三', deadline: '2024-04-15' },
  { id: 2, problemNo: 'AIM2024-002', title: '扭矩超差改善', level: 'B', status: '待验证', owner: '李四', deadline: '2024-04-20' }
]

export const aimSearchResult = [
  { id: 1, problemNo: 'AIM2024-001', title: '焊接不良改善', level: 'A', status: '进行中', createDate: '2024-03-15' },
  { id: 2, problemNo: 'AIM2023-008', title: '装配精度改善', level: 'B', status: '已关闭', createDate: '2023-11-20' }
]

export const aimStatData = [
  { month: '1月', newProblems: 5, closedProblems: 4, closureRate: 80 },
  { month: '2月', newProblems: 3, closedProblems: 5, closureRate: 100 },
  { month: '3月', newProblems: 7, closedProblems: 6, closureRate: 86 },
  { month: '4月', newProblems: 4, closedProblems: 3, closureRate: 75 }
]

// ============ 外购件数据 ============
export const incomingList = [
  { id: 1, inspectNo: 'IQC2024-001', supplierName: '宏伟供应商', partName: 'ECU模块', inspectDate: '2024-04-01', quantity: 100, qualified: 98, status: '合格' },
  { id: 2, inspectNo: 'IQC2024-002', supplierName: '振兴供应商', partName: '电池包', inspectDate: '2024-04-02', quantity: 50, qualified: 50, status: '合格' }
]

export const ppmData = [
  { month: '1月', supplierName: '宏伟供应商', totalQuantity: 5000, defectQuantity: 25, ppm: 5000 },
  { month: '2月', supplierName: '宏伟供应商', totalQuantity: 4800, defectQuantity: 20, ppm: 4167 },
  { month: '3月', supplierName: '宏伟供应商', totalQuantity: 5200, defectQuantity: 18, ppm: 3462 },
  { month: '4月', supplierName: '宏伟供应商', totalQuantity: 5000, defectQuantity: 15, ppm: 3000 }
]

// ============ QSM数据 ============
export const qualityObjectiveList = [
  { id: 1, objectiveNo: 'OBJ2024-001', content: '产品FPY达到98%以上', dept: '质量部', target: 98, current: 98.5, status: '达标' },
  { id: 2, objectiveNo: 'OBJ2024-002', content: '市场投诉处理及时率100%', dept: '市场部', target: 100, current: 95, status: '进行中' }
]
