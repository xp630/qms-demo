// QSM 模块 Mock 数据 - 质量文件管理

// 文件管理数据
export const documentList = [
  { id: 1, docNo: 'QMS-001', title: '质量手册', version: 'V3.2', dept: '质量部', updateTime: '2024-03-15', status: '有效', docType: '体系文件', pageCount: 45 },
  { id: 2, docNo: 'QMS-002', title: '程序文件-不合格品控制', version: 'V2.1', dept: '质量部', updateTime: '2024-02-20', status: '有效', docType: '程序文件', pageCount: 28 },
  { id: 3, docNo: 'QMS-003', title: '作业指导书-焊接工序', version: 'V1.5', dept: '生产部', updateTime: '2024-03-01', status: '有效', docType: '作业指导书', pageCount: 12 },
  { id: 4, docNo: 'QMS-004', title: '检验标准-来料检验', version: 'V2.3', dept: '质量部', updateTime: '2024-01-10', status: '修订中', docType: '检验标准', pageCount: 35 },
  { id: 5, docNo: 'QMS-005', title: '设备维护规程', version: 'V1.2', dept: '设备部', updateTime: '2024-02-28', status: '有效', docType: '操作规程', pageCount: 18 }
]

// 体系审核数据
export const auditRecords = [
  { id: 1, auditNo: 'A2024-001', type: '过程审核', dept: '焊装车间', auditor: '质量部', auditDate: '2024-03-20', status: '已完成', issues: 3, result: '合格' },
  { id: 2, auditNo: 'A2024-002', type: '产品审核', dept: '总装车间', auditor: '质量部', auditDate: '2024-03-25', status: '已完成', issues: 1, result: '合格' },
  { id: 3, auditNo: 'A2024-003', type: '体系审核', dept: '全厂', auditor: '外审机构', auditDate: '2024-04-01', status: '待整改', issues: 5, result: '待改进' },
  { id: 4, auditNo: 'A2024-004', type: '过程审核', dept: '涂装车间', auditor: '质量部', auditDate: '2024-04-03', status: '待审核', issues: 0, result: '待审核' }
]

// 质量目标数据
export const qualityObjectiveList = [
  { id: 1, objectiveNo: 'OBJ2024-001', content: '产品FPY达到98%以上', dept: '质量部', target: 98, current: 98.5, status: '达标', year: 2024 },
  { id: 2, objectiveNo: 'OBJ2024-002', content: '市场投诉处理及时率100%', dept: '市场部', target: 100, current: 95, status: '进行中', year: 2024 },
  { id: 3, objectiveNo: 'OBJ2024-003', content: '来料检验合格率99%以上', dept: '质量部', target: 99, current: 99.2, status: '达标', year: 2024 },
  { id: 4, objectiveNo: 'OBJ2024-004', content: '过程检验不良率控制在0.5%以内', dept: '生产部', target: 0.5, current: 0.8, status: '未达标', year: 2024 }
]

// 审核计划数据
export const auditPlanList = [
  { id: 1, planNo: 'AP2024-001', auditType: '内部审核', scope: '全厂', planDate: '2024-04-15', auditor: '质量部', status: '计划中' },
  { id: 2, planNo: 'AP2024-002', auditType: '过程审核', scope: '焊装车间', planDate: '2024-04-20', auditor: '质量部', status: '计划中' }
]
