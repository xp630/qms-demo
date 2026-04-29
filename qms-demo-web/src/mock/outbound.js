// OUTBOUND 模块 Mock 数据 - 外购件质量管理

// 来料检验数据
export const incomingList = [
  { id: 1, inspectNo: 'IQC2024-001', supplierName: '宏伟供应商', partName: 'ECU模块', inspectDate: '2024-04-01', quantity: 100, qualified: 98, status: '合格', inspector: '质检员A' },
  { id: 2, inspectNo: 'IQC2024-002', supplierName: '振兴供应商', partName: '电池包', inspectDate: '2024-04-02', quantity: 50, qualified: 50, status: '合格', inspector: '质检员B' },
  { id: 3, inspectNo: 'IQC2024-003', supplierName: '创新供应商', partName: '扭矩传感器', inspectDate: '2024-04-03', quantity: 80, qualified: 76, status: '待处理', inspector: '质检员A' }
]

// PPM计算数据
export const ppmData = [
  { month: '1月', supplierName: '宏伟供应商', totalQuantity: 5000, defectQuantity: 25, ppm: 5000, trend: '持平' },
  { month: '2月', supplierName: '宏伟供应商', totalQuantity: 4800, defectQuantity: 20, ppm: 4167, trend: '下降' },
  { month: '3月', supplierName: '宏伟供应商', totalQuantity: 5200, defectQuantity: 18, ppm: 3462, trend: '下降' },
  { month: '4月', supplierName: '宏伟供应商', totalQuantity: 5000, defectQuantity: 15, ppm: 3000, trend: '下降' }
]

// 受控发运数据
export const controlledShippingList = [
  { id: 1, shipNo: 'CS2024-001', customerName: '顾客A', partName: 'ECU模块', quantity: 50, shipDate: '2024-04-01', status: '正常', reason: '-' },
  { id: 2, shipNo: 'CS2024-002', customerName: '顾客B', partName: '电池包', quantity: 30, shipDate: '2024-04-02', status: '受控', reason: '市场投诉追溯' },
  { id: 3, shipNo: 'CS2024-003', customerName: '顾客C', partName: '扭矩传感器', quantity: 40, shipDate: '2024-04-03', status: '受控', reason: '质量问题隔离' }
]

// 供应商PPM排名
export const supplierPpmRank = [
  { rank: 1, supplierName: '创新供应商', avgPpm: 2800, level: 'A' },
  { rank: 2, supplierName: '宏伟供应商', avgPpm: 3900, level: 'A' },
  { rank: 3, supplierName: '振兴供应商', avgPpm: 5200, level: 'B' },
  { rank: 4, supplierName: '新兴供应商', avgPpm: 8500, level: 'C' }
]

// 检验标准数据
export const inspectionStandardList = [
  { id: 1, standardNo: 'INS-001', partType: '电子类', inspectionLevel: 'II', AQL: 0.65, mainItems: '功能测试,外观检查' },
  { id: 2, standardNo: 'INS-002', partType: '机械类', inspectionLevel: 'S-2', AQL: 1.0, mainItems: '尺寸检验,功能测试' },
  { id: 3, standardNo: 'INS-003', partType: '电池类', inspectionLevel: 'S-3', AQL: 0.4, mainItems: '安全测试,容量测试' }
]
