import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQualityStore = defineStore('quality', () => {
  // ============ MQM 市场质量数据 ============
  const claimList = ref([
    { id: 1, claimNo: 'CL2024-001', machineNo: 'M20240001', claimType: '质量问题索赔', amount: 5000, status: '待处理', customer: '顾客A', claimDate: '2024-04-01', description: '市场反馈气密性不合格' },
    { id: 2, claimNo: 'CL2024-002', machineNo: 'M20240003', claimType: '维修费用索赔', amount: 3000, status: '已结案', customer: '顾客B', claimDate: '2024-03-28', description: '维修产生的差旅费用' },
    { id: 3, claimNo: 'CL2024-003', machineNo: 'M20240005', claimType: '质量问题索赔', amount: 8000, status: '处理中', customer: '顾客C', claimDate: '2024-04-03', description: '扭矩不足导致返修' }
  ])

  const surveyList = ref([
    { id: 1, surveyNo: 'SV2024-001', machineNo: 'M20240001', surveyType: '现场调查', createDate: '2024-04-01', status: '进行中', surveyor: '王工', conclusion: '' },
    { id: 2, surveyNo: 'SV2024-002', machineNo: 'M20240005', surveyType: '返修调查', createDate: '2024-04-02', status: '已完成', surveyor: '李工', conclusion: '确认扭矩传感器故障' }
  ])

  const mqmDataAnalysis = ref([
    { month: '1月', claimCount: 12, claimAmount: 45000, returnRate: 0.8 },
    { month: '2月', claimCount: 8, claimAmount: 32000, returnRate: 0.6 },
    { month: '3月', claimCount: 15, claimAmount: 58000, returnRate: 1.2 },
    { month: '4月', claimCount: 10, claimAmount: 41000, returnRate: 0.7 }
  ])

  // ============ SQM 供应商质量数据 ============
  const supplierList = ref([
    { id: 1, supplierNo: 'S001', name: '宏伟供应商', level: 'A', apqpStatus: '进行中', ppapStatus: '已批准', score: 92, contact: '陈经理', phone: '13800138001' },
    { id: 2, supplierNo: 'S002', name: '振兴供应商', level: 'B', apqpStatus: '已关闭', ppapStatus: '已批准', score: 85, contact: '林经理', phone: '13800138002' },
    { id: 3, supplierNo: 'S003', name: '创新供应商', level: 'A', apqpStatus: '进行中', ppapStatus: '待提交', score: 88, contact: '黄经理', phone: '13800138003' }
  ])

  const incomingInspectionList = ref([
    { id: 1, inspectNo: 'IQC2024-001', supplierName: '宏伟供应商', partName: 'ECU模块', inspectDate: '2024-04-01', quantity: 100, qualified: 98, unqualified: 2, status: '合格', remark: '' },
    { id: 2, inspectNo: 'IQC2024-002', supplierName: '振兴供应商', partName: '电池包', inspectDate: '2024-04-02', quantity: 50, qualified: 50, unqualified: 0, status: '合格', remark: '' },
    { id: 3, inspectNo: 'IQC2024-003', supplierName: '创新供应商', partName: '扭矩传感器', inspectDate: '2024-04-03', quantity: 80, qualified: 76, unqualified: 4, status: '待处理', remark: '尺寸超差' }
  ])

  // ============ QIM 问题库/失效模式库 ============
  const failureModeLibrary = ref([
    { id: 1, modeCode: 'FM-001', modeName: '气密性不良', category: '焊接缺陷', cause: '焊缝气泡', prevention: '加强焊接参数监控', occurrence: 15, severity: '高' },
    { id: 2, modeCode: 'FM-002', modeName: '外观划伤', category: '表面缺陷', cause: '工装摩擦', prevention: '增加防护垫', occurrence: 12, severity: '中' },
    { id: 3, modeCode: 'FM-003', modeName: '扭矩不足', category: '装配缺陷', cause: '螺栓松动', prevention: '增加扭矩复检', occurrence: 10, severity: '高' },
    { id: 4, modeCode: 'FM-004', modeName: '尺寸超差', category: '加工缺陷', cause: '刀具磨损', prevention: '定期校准刀具', occurrence: 8, severity: '中' },
    { id: 5, modeCode: 'FM-005', modeName: '装配不良', category: '装配缺陷', cause: '零件配合间隙大', prevention: '增加装配检验', occurrence: 6, severity: '低' }
  ])

  // ============ 质量快报 ============
  const qualityBulletin = ref({
    enabledDepts: ['生产部', '质量部', '技术部'],
    refreshInterval: 30,
    items: [
      { type: 'S级问题', count: 1, message: '焊接不良导致气密性不合格 - 待处理' },
      { type: 'FPY告警', count: 2, message: '类型B机台FPY低于目标值' },
      { type: '待审批', count: 5, message: '5项偏差申请待审批' },
      { type: '计量临期', count: 3, message: '3台计量设备即将到期' }
    ]
  })

  return {
    claimList,
    surveyList,
    mqmDataAnalysis,
    supplierList,
    incomingInspectionList,
    failureModeLibrary,
    qualityBulletin
  }
})
