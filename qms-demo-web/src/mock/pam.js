// PAM 模块 Mock 数据 - 产品评审管理

// 过程AUDIT数据
export const processAuditList = [
  { id: 1, auditNo: 'PA2024-001', dept: '焊装车间', auditDate: '2024-03-20', auditor: '质量部', issues: 3, status: '已完成', result: '合格', nextDate: '2024-06-20' },
  { id: 2, auditNo: 'PA2024-002', dept: '涂装车间', auditDate: '2024-03-25', auditor: '质量部', issues: 2, status: '已完成', result: '合格', nextDate: '2024-06-25' },
  { id: 3, auditNo: 'PA2024-003', dept: '总装车间', auditDate: '2024-04-01', auditor: '质量部', issues: 0, status: '待审核', result: '待审核', nextDate: '' }
]

// 顾客评审数据
export const customerAuditList = [
  { id: 1, auditNo: 'CA2024-001', customerName: '顾客A', auditType: '第二方审核', auditDate: '2024-03-28', result: '通过', issues: 1, auditor: '顾客A质量部' },
  { id: 2, auditNo: 'CA2024-002', customerName: '顾客B', auditType: '供应商调查', auditDate: '2024-04-01', result: '待整改', issues: 4, auditor: '顾客B采购部' },
  { id: 3, auditNo: 'CA2024-003', customerName: '顾客C', auditType: '现场审核', auditDate: '2024-04-05', result: '待审核', issues: 0, auditor: '顾客C质量部' }
]

// 一致性抽查数据
export const spotCheckList = [
  { id: 1, checkNo: 'SC2024-001', productName: '类型A产品', checkDate: '2024-04-01', sampleSize: 50, qualified: 48, rate: '96%', result: '通过', inspector: '质检员A' },
  { id: 2, checkNo: 'SC2024-002', productName: '类型B产品', checkDate: '2024-04-03', sampleSize: 50, qualified: 47, rate: '94%', result: '待改进', inspector: '质检员B' },
  { id: 3, checkNo: 'SC2024-003', productName: '类型C产品', checkDate: '2024-04-05', sampleSize: 30, qualified: 30, rate: '100%', result: '通过', inspector: '质检员A' }
]

// AUDIT类型
export const auditTypes = ['过程审核', '产品审核', '体系审核', '第二方审核', '第三方审核']

// 审核标准
export const auditStandards = ['IATF16949', 'ISO9001', 'VDA6.3', '客户特殊要求']
