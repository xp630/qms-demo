// DMM 模块 Mock 数据 - 尺寸测量管理

// 测量计划数据
export const measurePlanList = [
  { id: 1, planNo: 'MP2024-001', planDate: '2024-04-01', model: '类型A', items: 12, status: '进行中', complateRate: 75, operator: '测量员A' },
  { id: 2, planNo: 'MP2024-002', planDate: '2024-04-03', model: '类型B', items: 8, status: '已完成', complateRate: 100, operator: '测量员B' },
  { id: 3, planNo: 'MP2024-003', planDate: '2024-04-05', model: '类型C', items: 15, status: '进行中', complateRate: 40, operator: '测量员A' }
]

// 测量数据
export const measureDataList = [
  { id: 1, measureNo: 'MD2024-001', partNo: 'P-001', pointCount: 24, qualified: 23, rate: '98.5%', measureDate: '2024-04-01', operator: '测量员A' },
  { id: 2, measureNo: 'MD2024-002', partNo: 'P-002', pointCount: 18, qualified: 18, rate: '100%', measureDate: '2024-04-02', operator: '测量员B' },
  { id: 3, measureNo: 'MD2024-003', partNo: 'P-003', pointCount: 30, qualified: 29, rate: '96.7%', measureDate: '2024-04-03', operator: '测量员A' }
]

// 尺寸问题数据
export const measureIssueList = [
  { id: 1, issueNo: 'MI2024-001', partNo: 'P-001', dimension: '长度100mm', deviation: '+0.05mm', severity: '高', status: '处理中', reportDate: '2024-04-03' },
  { id: 2, issueNo: 'MI2024-002', partNo: 'P-002', dimension: '宽度50mm', deviation: '-0.03mm', severity: '中', status: '已解决', reportDate: '2024-04-02' },
  { id: 3, issueNo: 'MI2024-003', partNo: 'P-003', dimension: '高度30mm', deviation: '+0.08mm', severity: '高', status: '待分析', reportDate: '2024-04-04' }
]

// 测量设备数据
export const measureEquipmentList = [
  { id: 1, equipNo: 'CMM-001', name: '三坐标测量仪', model: 'CMM-500', location: '测量室', lastCalibration: '2024-01-15', nextCalibration: '2025-01-15', status: '正常' },
  { id: 2, equipNo: 'CMM-002', name: '影像测量仪', model: 'IM-200', location: '测量室', lastCalibration: '2024-02-10', nextCalibration: '2024-08-10', status: '正常' }
]

// 测量项目数据
export const measureItemList = [
  { id: 1, itemNo: 'MI-001', itemName: '长度测量', method: '三坐标测量', tolerance: '±0.02mm', frequency: '每批次' },
  { id: 2, itemNo: 'MI-002', itemName: '宽度测量', method: '影像测量', tolerance: '±0.01mm', frequency: '每批次' },
  { id: 3, itemNo: 'MI-003', itemName: '高度测量', method: '三坐标测量', tolerance: '±0.03mm', frequency: '每批次' }
]
