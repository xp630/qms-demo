// PQM 模块 Mock 数据 - 生产质量管理

// 机台列表数据
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

// 关键件追溯数据
export const componentTraceList = [
  { id: 1, traceNo: 'CT2024-001', componentNo: 'C001', componentName: 'ECU控制器', supplier: '宏伟供应商', machineNo: 'M20240001', productionDate: '2024-04-01', batchNo: 'B20240401' },
  { id: 2, traceNo: 'CT2024-002', componentNo: 'C002', componentName: '电池包', supplier: '振兴供应商', machineNo: 'M20240002', productionDate: '2024-04-02', batchNo: 'B20240402' },
  { id: 3, traceNo: 'CT2024-003', componentNo: 'C003', componentName: '扭矩传感器', supplier: '创新供应商', machineNo: 'M20240003', productionDate: '2024-04-03', batchNo: 'B20240403' }
]

// 缺陷数据
export const defectList = [
  { id: 1, defectNo: 'D2024-001', machineNo: 'M20240001', defectType: '气密性不良', count: 23, severity: '高', findTime: '2024-04-06 10:30', status: '已返修' },
  { id: 2, defectNo: 'D2024-002', machineNo: 'M20240002', defectType: '外观划伤', count: 18, severity: '中', findTime: '2024-04-06 11:20', status: '处理中' },
  { id: 3, defectNo: 'D2024-003', machineNo: 'M20240005', defectType: '扭矩不足', count: 15, severity: '高', findTime: '2024-04-06 14:15', status: '已返修' },
  { id: 4, defectNo: 'D2024-004', machineNo: 'M20240003', defectType: '尺寸超差', count: 12, severity: '中', findTime: '2024-04-07 09:00', status: '待分析' },
  { id: 5, defectNo: 'D2024-005', machineNo: 'M20240006', defectType: '装配不良', count: 10, severity: '低', findTime: '2024-04-07 10:45', status: '处理中' }
]

// FPY/DPU 报表数据
export const fpyReportData = {
  daily: {
    months: ['1日', '2日', '3日', '4日', '5日', '6日', '7日'],
    fpy: [97.5, 98.2, 97.8, 98.5, 98.9, 98.3, 98.6],
    dpu: [2.8, 2.4, 2.6, 2.1, 1.9, 2.2, 2.0]
  },
  weekly: {
    weeks: ['第1周', '第2周', '第3周', '第4周'],
    fpy: [97.8, 98.1, 98.3, 98.5],
    dpu: [2.5, 2.3, 2.2, 2.1]
  },
  monthly: {
    months: ['1月', '2月', '3月', '4月'],
    fpy: [97.2, 97.8, 98.1, 98.5],
    dpu: [3.2, 2.9, 2.5, 2.3]
  }
}
