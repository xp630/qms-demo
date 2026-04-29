// GAM 模块 Mock 数据 - 计量保证管理

// 计量设备数据
export const equipmentList = [
  { id: 1, equipNo: 'ME-001', name: '三坐标测量仪', model: 'CMM-500', dept: '质检室', calibrationDate: '2024-01-15', nextDate: '2025-01-15', status: '正常', manufacturer: '蔡司' },
  { id: 2, equipNo: 'ME-002', name: '硬度计', model: 'HR-150A', dept: '质检室', calibrationDate: '2024-02-10', nextDate: '2024-08-10', status: '正常', manufacturer: '时代集团' },
  { id: 3, equipNo: 'ME-003', name: '扭矩扳手', model: 'TB-50', dept: '生产部', calibrationDate: '2024-03-05', nextDate: '2024-09-05', status: '临期', manufacturer: '世达' },
  { id: 4, equipNo: 'ME-004', name: '光谱仪', model: 'SP-800', dept: '质检室', calibrationDate: '2024-01-20', nextDate: '2025-01-20', status: '正常', manufacturer: '布鲁克' }
]

// 校准计划数据
export const calibrationList = [
  { id: 1, calibNo: 'CAL2024-001', equipNo: 'ME-001', equipName: '三坐标测量仪', calibrationDate: '2024-03-01', nextDate: '2024-09-01', status: '正常', calibrator: '计量院' },
  { id: 2, calibNo: 'CAL2024-002', equipNo: 'ME-002', equipName: '硬度计', calibrationDate: '2024-03-15', nextDate: '2024-09-15', status: '正常', calibrator: '计量院' },
  { id: 3, calibNo: 'CAL2024-003', equipNo: 'ME-003', equipName: '扭矩扳手', calibrationDate: '2024-03-20', nextDate: '2024-06-20', status: '临期', calibrator: '内部校准' }
]

// 检具管理数据
export const gaugeList = [
  { id: 1, gaugeNo: 'GG-001', name: '通止规', type: '长度类', dept: '质检室', lastCheck: '2024-03-01', nextCheck: '2024-06-01', status: '正常', gaugeType: '光滑塞规' },
  { id: 2, gaugeNo: 'GG-002', name: '螺纹塞规', type: '螺纹类', dept: '生产部', lastCheck: '2024-03-10', nextCheck: '2024-06-10', status: '正常', gaugeType: '螺纹环规' },
  { id: 3, gaugeNo: 'GG-003', name: '角度尺', type: '角度类', dept: '质检室', lastCheck: '2024-02-15', nextCheck: '2024-05-15', status: '正常', gaugeType: '万能角度尺' }
]

// 设备类型
export const equipmentTypes = ['测量设备', '检验设备', '校准设备', '监控设备', '其他']

// 校准状态
export const calibrationStatus = ['正常', '临期', '超期', '维修中', '已报废']
