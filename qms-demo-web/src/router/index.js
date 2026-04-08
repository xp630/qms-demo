import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/DashboardContent.vue'),
        meta: { title: '首页', icon: 'Odometer' }
      },
      // PQM 生产质量管理
      {
        path: 'pqm/machine-trace',
        name: 'MachineTrace',
        component: () => import('@/views/pqm/MachineTrace.vue'),
        meta: { title: '机台追溯', icon: 'Box', module: 'PQM' }
      },
      {
        path: 'pqm/component',
        name: 'ComponentTrace',
        component: () => import('@/views/pqm/Component.vue'),
        meta: { title: '关键件追溯', icon: 'Connection', module: 'PQM' }
      },
      {
        path: 'pqm/defect',
        name: 'DefectQuery',
        component: () => import('@/views/pqm/Defect.vue'),
        meta: { title: '缺陷查询', icon: 'Warning', module: 'PQM' }
      },
      {
        path: 'pqm/report',
        name: 'Report',
        component: () => import('@/views/pqm/Report.vue'),
        meta: { title: 'FPY/DPU报表', icon: 'DataLine', module: 'PQM' }
      },
      // QIM 质量改进
      {
        path: 'qim/problem-list',
        name: 'ProblemList',
        component: () => import('@/views/qim/ProblemList.vue'),
        meta: { title: '问题列表', icon: 'QuestionFilled', module: 'QIM' }
      },
      {
        path: 'qim/problem-create',
        name: 'ProblemCreate',
        component: () => import('@/views/qim/ProblemCreate.vue'),
        meta: { title: '创建问题', icon: 'Plus', module: 'QIM' }
      },
      {
        path: 'qim/problem-detail/:id',
        name: 'ProblemDetail',
        component: () => import('@/views/qim/ProblemDetail.vue'),
        meta: { title: '问题详情', icon: 'Document', module: 'QIM' }
      },
      // QSM 质量文件
      {
        path: 'qsm/document',
        name: 'Document',
        component: () => import('@/views/qsm/Document.vue'),
        meta: { title: '文件管理', icon: 'FolderOpened', module: 'QSM' }
      },
      {
        path: 'qsm/audit',
        name: 'Audit',
        component: () => import('@/views/qsm/Audit.vue'),
        meta: { title: '体系审核', icon: 'Aim', module: 'QSM' }
      },
      {
        path: 'qsm/objective',
        name: 'Objective',
        component: () => import('@/views/qsm/Objective.vue'),
        meta: { title: '质量目标', icon: 'Aim', module: 'QSM' }
      },
      // DAM 偏差管理
      {
        path: 'dam/apply',
        name: 'DamApply',
        component: () => import('@/views/dam/Apply.vue'),
        meta: { title: '偏差申请', icon: 'EditPen', module: 'DAM' }
      },
      {
        path: 'dam/approve',
        name: 'DamApprove',
        component: () => import('@/views/dam/Approve.vue'),
        meta: { title: '偏差审批', icon: 'Checked', module: 'DAM' }
      },
      {
        path: 'dam/record',
        name: 'DamRecord',
        component: () => import('@/views/dam/Record.vue'),
        meta: { title: '偏差记录', icon: 'List', module: 'DAM' }
      },
      // DMM 尺寸测量
      {
        path: 'dmm/plan',
        name: 'MeasurePlan',
        component: () => import('@/views/dmm/Plan.vue'),
        meta: { title: '测量计划', icon: 'Calendar', module: 'DMM' }
      },
      {
        path: 'dmm/data',
        name: 'MeasureData',
        component: () => import('@/views/dmm/Data.vue'),
        meta: { title: '测量数据', icon: 'DataAnalysis', module: 'DMM' }
      },
      {
        path: 'dmm/issue',
        name: 'MeasureIssue',
        component: () => import('@/views/dmm/Issue.vue'),
        meta: { title: '尺寸问题', icon: 'Warning', module: 'DMM' }
      },
      // MQM 市场质量
      {
        path: 'mqm/tech-report',
        name: 'TechReport',
        component: () => import('@/views/mqm/TechReport.vue'),
        meta: { title: '技术报告', icon: 'Document', module: 'MQM' }
      },
      {
        path: 'mqm/claim',
        name: 'Claim',
        component: () => import('@/views/mqm/Claim.vue'),
        meta: { title: '问题索赔', icon: 'Money', module: 'MQM' }
      },
      {
        path: 'mqm/survey',
        name: 'Survey',
        component: () => import('@/views/mqm/Survey.vue'),
        meta: { title: '机台调查', icon: 'Search', module: 'MQM' }
      },
      {
        path: 'mqm/data-analysis',
        name: 'MqMDataAnalysis',
        component: () => import('@/views/mqm/DataAnalysis.vue'),
        meta: { title: '数据分析', icon: 'TrendCharts', module: 'MQM' }
      },
      // GAM 计量管理
      {
        path: 'gam/equipment',
        name: 'Equipment',
        component: () => import('@/views/gam/Equipment.vue'),
        meta: { title: '计量设备', icon: 'Tools', module: 'GAM' }
      },
      {
        path: 'gam/calibration',
        name: 'Calibration',
        component: () => import('@/views/gam/Calibration.vue'),
        meta: { title: '校准计划', icon: 'Timer', module: 'GAM' }
      },
      {
        path: 'gam/gauge',
        name: 'Gauge',
        component: () => import('@/views/gam/Gauge.vue'),
        meta: { title: '检具管理', icon: 'Histogram', module: 'GAM' }
      },
      // SQM 供应商质量
      {
        path: 'sqm/apqp',
        name: 'APQP',
        component: () => import('@/views/sqm/APQP.vue'),
        meta: { title: 'APQP管理', icon: 'Guide', module: 'SQM' }
      },
      {
        path: 'sqm/ppap',
        name: 'PPAP',
        component: () => import('@/views/sqm/PPAP.vue'),
        meta: { title: 'PPAP管理', icon: 'DocumentCopy', module: 'SQM' }
      },
      {
        path: 'sqm/performance',
        name: 'Performance',
        component: () => import('@/views/sqm/Performance.vue'),
        meta: { title: '绩效管理', icon: 'DataLine', module: 'SQM' }
      },
      // LAB 实验室
      {
        path: 'lab/test',
        name: 'Test',
        component: () => import('@/views/lab/Test.vue'),
        meta: { title: '试验委托', icon: 'Collection', module: 'LAB' }
      },
      {
        path: 'lab/report',
        name: 'LabReport',
        component: () => import('@/views/lab/Report.vue'),
        meta: { title: '报告管理', icon: 'DocumentCopy', module: 'LAB' }
      },
      // PAM 产品评审
      {
        path: 'pam/process',
        name: 'ProcessAudit',
        component: () => import('@/views/pam/Process.vue'),
        meta: { title: '过程AUDIT', icon: 'SetUp', module: 'PAM' }
      },
      {
        path: 'pam/customer',
        name: 'CustomerAudit',
        component: () => import('@/views/pam/Customer.vue'),
        meta: { title: '顾客评审', icon: 'User', module: 'PAM' }
      },
      {
        path: 'pam/spot',
        name: 'SpotCheck',
        component: () => import('@/views/pam/Spot.vue'),
        meta: { title: '一致性抽查', icon: 'Collection', module: 'PAM' }
      },
      // TRACE 机台溯源
      {
        path: 'trace/production',
        name: 'TraceProduction',
        component: () => import('@/views/trace/Production.vue'),
        meta: { title: '生产信息', icon: 'Goods', module: 'TRACE' }
      },
      {
        path: 'trace/battery',
        name: 'TraceBattery',
        component: () => import('@/views/trace/Battery.vue'),
        meta: { title: '电池管理', icon: 'Coin', module: 'TRACE' }
      },
      {
        path: 'trace/sale',
        name: 'TraceSale',
        component: () => import('@/views/trace/Sale.vue'),
        meta: { title: '销售信息', icon: 'Sell', module: 'TRACE' }
      },
      // TORQUE 扭矩管理
      {
        path: 'torque/sync',
        name: 'TorqueSync',
        component: () => import('@/views/torque/Sync.vue'),
        meta: { title: '数据同步', icon: 'Refresh', module: 'TORQUE' }
      },
      {
        path: 'torque/process',
        name: 'TorqueProcess',
        component: () => import('@/views/torque/Process.vue'),
        meta: { title: '数据处理', icon: 'Operation', module: 'TORQUE' }
      },
      {
        path: 'torque/stat',
        name: 'TorqueStat',
        component: () => import('@/views/torque/Stat.vue'),
        meta: { title: '统计分析', icon: 'PieChart', module: 'TORQUE' }
      },
      // AIM 问题改进
      {
        path: 'aim/problem',
        name: 'AimProblem',
        component: () => import('@/views/aim/Problem.vue'),
        meta: { title: '问题管理', icon: 'QuestionFilled', module: 'AIM' }
      },
      {
        path: 'aim/search',
        name: 'AimSearch',
        component: () => import('@/views/aim/Search.vue'),
        meta: { title: '问题检索', icon: 'Search', module: 'AIM' }
      },
      {
        path: 'aim/stat',
        name: 'AimStat',
        component: () => import('@/views/aim/Stat.vue'),
        meta: { title: '统计分析', icon: 'Histogram', module: 'AIM' }
      },
      // 外购件质量
      {
        path: 'outbound/incoming',
        name: 'Incoming',
        component: () => import('@/views/outbound/Incoming.vue'),
        meta: { title: '来料检验', icon: 'Box', module: 'OUTBOUND' }
      },
      {
        path: 'outbound/ppm',
        name: 'PPM',
        component: () => import('@/views/outbound/PPM.vue'),
        meta: { title: 'PPM计算', icon: 'Coin', module: 'OUTBOUND' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
