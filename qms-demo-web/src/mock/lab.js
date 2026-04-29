// LAB 模块 Mock 数据 - 实验室管理

// 试验委托数据
export const testList = [
  { id: 1, testNo: 'TE2024-001', productName: '电池包', testType: '安全测试', applicant: '张三', applyDate: '2024-04-01', status: '待接收', expectedDate: '2024-04-10', testItems: ['过充测试', '短路测试', '温度循环'] },
  { id: 2, testNo: 'TE2024-002', productName: 'ECU模块', testType: '性能测试', applicant: '李四', applyDate: '2024-04-02', status: '进行中', expectedDate: '2024-04-08', testItems: ['电气性能', 'EMC测试'] },
  { id: 3, testNo: 'TE2024-003', productName: '类型A产品', testType: '可靠性测试', applicant: '王五', applyDate: '2024-04-03', status: '待排期', expectedDate: '2024-04-15', testItems: ['寿命测试', '振动测试'] }
]

// 报告管理数据
export const labReportList = [
  { id: 1, reportNo: 'LR2024-001', testNo: 'TE2024-001', conclusion: '合格', reportDate: '2024-04-05', auditor: '王工', attachments: ['测试数据.pdf', '现场照片.zip'] },
  { id: 2, reportNo: 'LR2024-002', testNo: 'TE2023-015', conclusion: '不合格', reportDate: '2023-12-20', auditor: '赵工', attachments: ['不合格项说明.pdf'] }
]

// 试验类型
export const testTypes = ['安全测试', '性能测试', '可靠性测试', '寿命测试', '环境测试', 'EMC测试', '材料分析']

// 试验状态
export const testStatuses = ['待接收', '待排期', '进行中', '已完成', '已报告']

// 试验设备
export const labEquipmentList = [
  { id: 1, equipNo: 'LE-001', name: '电池测试系统', model: 'BTS-2000', status: '正常', location: '安全实验室' },
  { id: 2, equipNo: 'LE-002', name: 'EMC测试设备', model: 'EMC-3000', status: '正常', location: 'EMC实验室' },
  { id: 3, equipNo: 'LE-003', name: '振动试验台', model: 'VT-500', status: '维护中', location: '可靠性实验室' }
]
