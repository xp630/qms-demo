// QIM 模块 Mock 数据 - 质量改进管理

// 问题列表数据
export const problemList = [
  { id: 1, problemNo: 'Q2024-001', title: '焊接不良导致气密性不合格', level: 'S', status: '处理中', dept: '生产部', source: '生产过程', createTime: '2024-04-01', assignee: '张工', progress: 2, phase: '短期措施', ownership: '生产部', description: '焊接工序存在气密性不良问题，需要分析原因并改善' },
  { id: 2, problemNo: 'Q2024-002', title: '来料尺寸超差', level: 'A', status: '待分发', dept: '采购部', source: '来料检验', createTime: '2024-04-02', assignee: '李工', progress: 0, phase: '原因分析', ownership: '采购部', description: '来料检验发现零部件尺寸超出规格范围' },
  { id: 3, problemNo: 'Q2024-003', title: '涂装气泡问题', level: 'B', status: '已关闭', dept: '涂装部', source: '市场反馈', createTime: '2024-03-28', assignee: '王工', progress: 4, phase: '验证关闭', ownership: '涂装部', description: '市场反馈涂装表面存在气泡问题' },
  { id: 4, problemNo: 'Q2024-004', title: '扭矩数据异常', level: 'A', status: '处理中', dept: '质量部', source: 'MES系统', createTime: '2024-04-03', assignee: '刘工', progress: 1, phase: '原因分析', ownership: '质量部', description: '扭矩采集数据显示异常波动' },
  { id: 5, problemNo: 'Q2024-005', title: '零部件装配偏差', level: 'C', status: '待验证', dept: '生产部', source: '过程检验', createTime: '2024-04-05', assignee: '陈工', progress: 3, phase: '验证关闭', ownership: '生产部', description: '装配过程中发现零部件配合偏差' }
]

// 问题详情数据
export const problemDetail = {
  basicInfo: {
    problemNo: 'Q2024-001',
    level: 'S',
    status: '处理中',
    dept: '生产部',
    source: '生产过程',
    createTime: '2024-04-01',
    assignee: '张工',
    deadline: '2024-04-15'
  },
  description: '焊接工序存在气密性不良问题，需要分析原因并改善',
  analysis: {
    rootCause: '焊接参数设置不当，电流过大导致焊缝气孔',
    affectedScope: '影响M20240001、M20240002机台产品',
    impact: '不良率上升2%，预计损失约5万元'
  },
  measures: {
    shortTerm: ['调整焊接电流参数', '增加焊缝检验频次'],
    longTerm: ['更换焊接设备', '优化工艺流程']
  },
  records: [
    { date: '2024-04-01', action: '问题创建', operator: '张工', result: '问题已记录' },
    { date: '2024-04-02', action: '原因分析', operator: '张工', result: '定位到焊接参数问题' },
    { date: '2024-04-03', action: '短期措施实施', operator: '张工', result: '参数已调整' }
  ]
}

// 问题定义数据
export const problemDefinition = {
  problemTypes: ['质量问题', '安全隐患', '效率损失', '成本浪费', '其他'],
  sourceTypes: ['生产过程', '来料检验', '过程检验', '市场反馈', '客户投诉', 'MES系统'],
  ownershipOptions: ['生产部', '质量部', '技术部', '采购部', '设备部', '市场部']
}

// 问题确认分发数据
export const problemConfirmList = [
  { id: 1, problemNo: 'Q2024-006', title: '新发现问题待确认', level: 'B', source: '生产过程', createTime: '2024-04-06', status: '待确认' },
  { id: 2, problemNo: 'Q2024-007', title: '来料异常待分发', level: 'A', source: '来料检验', createTime: '2024-04-07', status: '待分发' }
]

// 问题处理数据
export const problemHandlingList = [
  { id: 1, problemNo: 'Q2024-001', currentStep: '短期措施', nextStep: '长期措施', handler: '张工', deadline: '2024-04-10', status: '进行中' },
  { id: 2, problemNo: 'Q2024-004', currentStep: '原因分析', nextStep: '短期措施', handler: '刘工', deadline: '2024-04-12', status: '进行中' }
]

// 问题库数据
export const problemLibraryList = [
  { id: 1, problemType: '焊接缺陷', similarCount: 15, solution: '调整焊接参数', effectRate: 92 },
  { id: 2, problemType: '尺寸超差', similarCount: 23, solution: '增加检验频次', effectRate: 85 },
  { id: 3, problemType: '装配不良', similarCount: 18, solution: '优化装配工艺', effectRate: 88 }
]
