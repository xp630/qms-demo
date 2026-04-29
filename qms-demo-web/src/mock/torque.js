// TORQUE 模块 Mock 数据 - 扭矩管理

// 数据同步数据
export const torqueSyncList = [
  { id: 1, syncNo: 'TS2024-001', machineNo: 'M20240001', syncTime: '2024-04-01 10:00', dataCount: 1200, status: '已完成', operator: '系统自动' },
  { id: 2, syncNo: 'TS2024-002', machineNo: 'M20240002', syncTime: '2024-04-01 14:00', dataCount: 980, status: '进行中', operator: '系统自动' },
  { id: 3, syncNo: 'TS2024-003', machineNo: 'M20240003', syncTime: '2024-04-01 18:00', dataCount: 1100, status: '待处理', operator: '系统自动' }
]

// 数据处理数据
export const torqueProcessList = [
  { id: 1, processNo: 'TP2024-001', dataNo: 'TS2024-001', processType: '数据分析', startTime: '2024-04-01 10:30', status: '已完成', result: '正常' },
  { id: 2, processNo: 'TP2024-002', dataNo: 'TS2024-002', processType: '异常检测', startTime: '2024-04-01 14:30', status: '进行中', result: '检测中' },
  { id: 3, processNo: 'TP2024-003', dataNo: 'TS2024-003', processType: '数据归档', startTime: '2024-04-01 18:30', status: '待处理', result: '-' }
]

// 统计分析数据
export const torqueStatList = [
  { month: '1月', avgTorque: 25.3, minTorque: 22.1, maxTorque: 28.5, qualifiedRate: 98.2, totalCount: 50000 },
  { month: '2月', avgTorque: 25.5, minTorque: 22.5, maxTorque: 28.2, qualifiedRate: 98.5, totalCount: 48000 },
  { month: '3月', avgTorque: 25.2, minTorque: 21.8, maxTorque: 28.8, qualifiedRate: 97.9, totalCount: 52000 },
  { month: '4月', avgTorque: 25.4, minTorque: 22.0, maxTorque: 28.6, qualifiedRate: 98.6, totalCount: 51000 }
]

// 扭矩告警数据
export const torqueAlarmList = [
  { id: 1, alarmNo: 'TA2024-001', machineNo: 'M20240001', torqueValue: 21.5, setValue: 25, deviation: '-14%', severity: '高', alarmTime: '2024-04-01 09:30', status: '已确认' },
  { id: 2, alarmNo: 'TA2024-002', machineNo: 'M20240002', torqueValue: 29.0, setValue: 25, deviation: '+16%', severity: '中', alarmTime: '2024-04-01 15:20', status: '处理中' }
]

// 工艺参数数据
export const torqueSpecList = [
  { id: 1, stationNo: 'S001', stationName: '焊接工位', targetTorque: 25, tolerance: '±10%', unit: 'N.m', status: '正常' },
  { id: 2, id: 2, stationNo: 'S002', stationName: '装配工位', targetTorque: 30, tolerance: '±8%', unit: 'N.m', status: '正常' },
  { id: 3, stationNo: 'S003', stationName: '紧固工位', targetTorque: 20, tolerance: '±12%', unit: 'N.m', status: '临期' }
]
