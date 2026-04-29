// DAM 模块 Mock 数据 - 偏差批准管理

// 偏差申请数据
export const damApplyList = [
  { id: 1, damNo: 'DA2024-001', description: '焊接参数偏移', applicant: '张三', applyDate: '2024-04-01', status: '待审批', urgency: '紧急', reason: '设备老化导致参数漂移' },
  { id: 2, damNo: 'DA2024-002', description: '来料尺寸超差', applicant: '李四', applyDate: '2024-04-02', status: '待审批', urgency: '高', reason: '供应商来料超出规格' }
]

// 偏差审批数据
export const damApproveList = [
  { id: 1, damNo: 'DA2024-001', description: '焊接参数偏移', applicant: '张三', applyDate: '2024-04-01', status: '待审批', urgency: '紧急' },
  { id: 2, damNo: 'DA2024-002', description: '来料尺寸超差', applicant: '李四', applyDate: '2024-04-02', status: '待审批', urgency: '高' },
  { id: 3, damNo: 'DA2024-003', description: '涂装温度异常', applicant: '王五', applyDate: '2024-03-28', status: '审批中', urgency: '中' }
]

// 偏差实施数据
export const damImplementationList = [
  { id: 1, damNo: 'DA2024-001', description: '焊接参数偏移', implementer: '张三', startDate: '2024-04-03', endDate: '2024-04-10', status: '进行中', progress: 60 },
  { id: 2, damNo: 'DA2023-015', description: '涂装温度异常', implementer: '王五', startDate: '2023-12-12', endDate: '2023-12-18', status: '已完成', progress: 100 }
]

// 偏差关闭数据
export const damCloseList = [
  { id: 1, damNo: 'DA2024-001', description: '焊接参数偏移', status: '待关闭', closeDate: '', verifier: '质量部' },
  { id: 2, damNo: 'DA2023-015', description: '涂装温度异常', status: '已关闭', closeDate: '2023-12-20', verifier: '质量部' }
]

// 偏差报告数据
export const damReportList = [
  { id: 1, damNo: 'DA2024-001', description: '焊接参数偏移', status: '处理中', createDate: '2024-04-01', affectedQty: 150, disposal: '降级使用' },
  { id: 2, damNo: 'DA2023-015', description: '涂装温度异常', status: '已关闭', createDate: '2023-12-10', affectedQty: 80, disposal: '返工处理' }
]

// 偏差记录数据
export const damRecordList = [
  { id: 1, damNo: 'DA2024-001', description: '焊接参数偏移', status: '处理中', createDate: '2024-04-01', closeDate: '-' },
  { id: 2, damNo: 'DA2023-015', description: '涂装温度异常', status: '已关闭', createDate: '2023-12-10', closeDate: '2023-12-15' },
  { id: 3, damNo: 'DA2023-012', description: '来料色泽差异', status: '已关闭', createDate: '2023-11-05', closeDate: '2023-11-08' }
]

// 偏差类型
export const damTypes = ['原材料偏差', '工艺参数偏差', '设备参数偏差', '检验方法偏差', '其他']
