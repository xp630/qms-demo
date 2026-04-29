import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDamStore = defineStore('dam', () => {
  // DAM状态
  const damStatuses = ['待审批', '审批中', '已批准', '已拒绝', '实施中', '已关闭']

  // DAM列表
  const damList = ref([
    { id: 1, damNo: 'DA2024-001', description: '焊接参数偏移', applicant: '张三', applyDate: '2024-04-01', deadline: '2024-04-15', status: '审批中', currentLevel: 1, totalLevels: 3, version: 'V1.0' },
    { id: 2, damNo: 'DA2024-002', description: '来料尺寸超差', applicant: '李四', applyDate: '2024-04-02', deadline: '2024-04-18', status: '待审批', currentLevel: 1, totalLevels: 3, version: 'V1.0' },
    { id: 3, damNo: 'DA2024-003', description: '涂装温度异常', applicant: '王五', applyDate: '2024-03-28', deadline: '2024-04-10', status: '实施中', currentLevel: 3, totalLevels: 3, version: 'V1.1' },
    { id: 4, damNo: 'DA2024-004', description: '扭矩设置调整', applicant: '赵六', applyDate: '2024-03-25', deadline: '2024-04-08', status: '已关闭', currentLevel: 3, totalLevels: 3, version: 'V1.0' },
    { id: 5, damNo: 'DA2024-005', description: '物料替换申请', applicant: '孙七', applyDate: '2024-04-03', deadline: '2024-04-20', status: '待审批', currentLevel: 1, totalLevels: 3, version: 'V1.0' }
  ])

  // DAM详情
  const damRecords = ref([
    { id: 1, damNo: 'DA2024-001', description: '焊接参数偏移', status: '审批中', createDate: '2024-04-01', closeDate: null, versions: ['V1.0'], currentVersion: 'V1.0' },
    { id: 2, damNo: 'DA2024-003', description: '涂装温度异常', status: '已关闭', createDate: '2024-03-28', closeDate: '2024-04-05', versions: ['V1.0'], currentVersion: 'V1.0' },
    { id: 3, damNo: 'DA2024-004', description: '扭矩设置调整', status: '已关闭', createDate: '2024-03-25', closeDate: '2024-03-30', versions: ['V1.0'], currentVersion: 'V1.0' }
  ])

  // 获取状态类型
  const getStatusType = (status) => {
    const map = { '待审批': 'info', '审批中': 'warning', '已批准': 'primary', '已拒绝': 'danger', '实施中': 'warning', '已关闭': 'success' }
    return map[status] || ''
  }

  // 获取审批级别颜色
  const getLevelColor = (current, total) => {
    if (current >= total) return 'success'
    if (current >= total - 1) return 'warning'
    return 'info'
  }

  // 审批流程节点
  const approvalNodes = [
    { level: 1, name: '部门主管', role: '部门审批' },
    { level: 2, name: '质量部', role: '质量审批' },
    { level: 3, name: '技术总监', role: '技术审批' }
  ]

  return {
    damStatuses,
    damList,
    damRecords,
    approvalNodes,
    getStatusType,
    getLevelColor
  }
})
