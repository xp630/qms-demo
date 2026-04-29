import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useMachineStore = defineStore('machine', () => {
  // 计划号 → 机台列表 (nested data for drill-down)
  const machinesByPlan = reactive({
    'P2024-01': {
      planNo: 'P2024-01',
      model: '类型A',
      targetFpy: 98.0,
      machines: [
        { id: 1, machineNo: 'M20240001', planNo: 'P2024-01', model: '类型A', totalCount: 1256, fpyRate: 98.5, status: '正常', configCode: 'CFG-A001', createTime: '2024-01-15', defects: [] },
        { id: 2, machineNo: 'M20240002', planNo: 'P2024-01', model: '类型A', totalCount: 890, fpyRate: 97.2, status: '正常', configCode: 'CFG-A001', createTime: '2024-01-16', defects: [] }
      ]
    },
    'P2024-02': {
      planNo: 'P2024-02',
      model: '类型B',
      targetFpy: 98.0,
      machines: [
        { id: 3, machineNo: 'M20240003', planNo: 'P2024-02', model: '类型B', totalCount: 756, fpyRate: 99.1, status: '维护中', configCode: 'CFG-B002', createTime: '2024-02-01', defects: [] },
        { id: 4, machineNo: 'M20240004', planNo: 'P2024-02', model: '类型B', totalCount: 543, fpyRate: 96.8, status: '正常', configCode: 'CFG-B002', createTime: '2024-02-10', defects: [] }
      ]
    },
    'P2024-03': {
      planNo: 'P2024-03',
      model: '类型C',
      targetFpy: 98.0,
      machines: [
        { id: 5, machineNo: 'M20240005', planNo: 'P2024-03', model: '类型C', totalCount: 1200, fpyRate: 98.2, status: '正常', configCode: 'CFG-C003', createTime: '2024-03-05', defects: [] },
        { id: 6, machineNo: 'M20240006', planNo: 'P2024-03', model: '类型C', totalCount: 980, fpyRate: 97.5, status: '异常', configCode: 'CFG-C003', createTime: '2024-03-12', defects: [] }
      ]
    },
    'P2024-04': {
      planNo: 'P2024-04',
      model: '类型A',
      targetFpy: 98.0,
      machines: [
        { id: 7, machineNo: 'M20240007', planNo: 'P2024-04', model: '类型A', totalCount: 650, fpyRate: 99.3, status: '正常', configCode: 'CFG-A001', createTime: '2024-04-01', defects: [] },
        { id: 8, machineNo: 'M20240008', planNo: 'P2024-04', model: '类型A', totalCount: 430, fpyRate: 95.6, status: '正常', configCode: 'CFG-A001', createTime: '2024-04-15', defects: [] }
      ]
    }
  })

  // 所有缺陷数据
  const defectList = ref([
    { id: 1, defectNo: 'D2024-001', machineNo: 'M20240001', defectType: '气密性不良', count: 23, severity: '高', findTime: '2024-04-06 10:30', status: '已返修', planNo: 'P2024-01', components: [] },
    { id: 2, defectNo: 'D2024-002', machineNo: 'M20240002', defectType: '外观划伤', count: 18, severity: '中', findTime: '2024-04-06 11:20', status: '处理中', planNo: 'P2024-01', components: [] },
    { id: 3, defectNo: 'D2024-003', machineNo: 'M20240005', defectType: '扭矩不足', count: 15, severity: '高', findTime: '2024-04-06 14:15', status: '已返修', planNo: 'P2024-03', components: [] },
    { id: 4, defectNo: 'D2024-004', machineNo: 'M20240003', defectType: '尺寸超差', count: 12, severity: '中', findTime: '2024-04-07 09:00', status: '待分析', planNo: 'P2024-02', components: [] },
    { id: 5, defectNo: 'D2024-005', machineNo: 'M20240006', defectType: '装配不良', count: 10, severity: '低', findTime: '2024-04-07 10:45', status: '处理中', planNo: 'P2024-03', components: [] }
  ])

  // 关键件追溯数据
  const componentList = ref([
    { id: 1, partNo: 'P-001', partName: 'ECU模块', serialNo: 'ECU20240315001', supplier: '宏伟供应商', machineNo: 'M20240001', planNo: 'P2024-01' },
    { id: 2, partNo: 'P-002', partName: '电池包', serialNo: 'BAT20240315002', supplier: '振兴供应商', machineNo: 'M20240001', planNo: 'P2024-01' },
    { id: 3, partNo: 'P-003', partName: '扭矩传感器', serialNo: 'TS20240315003', supplier: '创新供应商', machineNo: 'M20240002', planNo: 'P2024-01' }
  ])

  // 缺陷TOP10
  const defectTop10 = ref([
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
  ])

  // FPY趋势数据
  const fpyTrendData = ref({
    months: ['1月', '2月', '3月', '4月'],
    actual: [97.2, 97.8, 98.1, 98.5],
    target: [98.0, 98.0, 98.0, 98.0]
  })

  // DPU趋势数据
  const dpuTrendData = ref({
    months: ['1月', '2月', '3月', '4月'],
    actual: [3.2, 2.9, 2.5, 2.3],
    target: [2.5, 2.5, 2.5, 2.5]
  })

  // 获取所有机台
  const getAllMachines = () => {
    const machines = []
    Object.values(machinesByPlan).forEach(plan => {
      machines.push(...plan.machines)
    })
    return machines
  }

  // 根据计划号获取机台
  const getMachinesByPlan = (planNo) => {
    return machinesByPlan[planNo] || null
  }

  // 根据机台号获取缺陷
  const getDefectsByMachine = (machineNo) => {
    return defectList.value.filter(d => d.machineNo === machineNo)
  }

  // 根据计划号获取缺陷
  const getDefectsByPlan = (planNo) => {
    return defectList.value.filter(d => d.planNo === planNo)
  }

  return {
    machinesByPlan,
    defectList,
    componentList,
    defectTop10,
    fpyTrendData,
    dpuTrendData,
    getAllMachines,
    getMachinesByPlan,
    getDefectsByMachine,
    getDefectsByPlan
  }
})
