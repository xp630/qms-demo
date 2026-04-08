# QMS 前端Demo 设计文档

## 1. 项目概述

- **项目名称**: QMS Demo (质量管理系统前端演示)
- **项目类型**: 纯前端Vue3应用，后端Mock
- **核心功能**: 展示QMS系统14个模块的UI界面和交互流程
- **目标用户**: 客户演示、团队开发参考

## 2. 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Vue3 + Composition API | ^3.4 |
| UI库 | Element Plus | ^2.5 |
| 状态管理 | Pinia | ^2.1 |
| 路由 | Vue Router | ^4.2 |
| 图表 | ECharts | ^5.4 |
| 构建 | Vite | ^5.0 |
| Mock | 内置JS数据 | - |

## 3. 模块清单

| 序号 | 模块编码 | 模块名称 | 页面数 | 优先级 |
|------|----------|----------|--------|--------|
| 1 | PQM | 生产质量管理 | 4 | P0 |
| 2 | QIM | 质量改进管理 | 3 | P0 |
| 3 | QSM | 质量文件管理 | 3 | P0 |
| 4 | DAM | 偏差批准管理 | 3 | P1 |
| 5 | DMM | 尺寸测量管理 | 3 | P1 |
| 6 | MQM | 市场质量管理 | 4 | P1 |
| 7 | GAM | 计量保证管理 | 3 | P2 |
| 8 | SQM | 供应商质量管理 | 3 | P2 |
| 9 | LAB | 实验室管理 | 2 | P2 |
| 10 | PAM | 产品评审管理 | 3 | P2 |
| 11 | TRACE | 机台溯源管理 | 3 | P2 |
| 12 | TORQUE | 扭矩管理 | 3 | P2 |
| 13 | AIM | 问题改进管理 | 3 | P1 |
| 14 | 外购件 | 外购件质量管理 | 2 | P2 |

## 4. 页面结构

```
qms-demo-web/
├── src/
│   ├── views/
│   │   ├── Dashboard.vue           # 首页
│   │   ├── pqm/                   # PQM模块
│   │   │   ├── MachineTrace.vue   # 机台追溯
│   │   │   ├── Component.vue      # 关键件追溯
│   │   │   ├── Defect.vue         # 缺陷查询
│   │   │   └── Report.vue         # FPY/DPU报表
│   │   ├── qim/                   # QIM模块
│   │   │   ├── ProblemList.vue    # 问题列表
│   │   │   ├── ProblemDetail.vue  # 问题详情
│   │   │   └── ProblemCreate.vue  # 创建问题
│   │   ├── qsm/                   # QSM模块
│   │   ├── dam/                   # DAM模块
│   │   ├── dmm/                   # DMM模块
│   │   ├── mqm/                   # MQM模块
│   │   ├── gam/                   # GAM模块
│   │   ├── sqm/                   # SQM模块
│   │   ├── lab/                   # LAB模块
│   │   ├── pam/                   # PAM模块
│   │   ├── trace/                 # TRACE模块
│   │   └── torque/                # TORQUE模块
│   ├── components/               # 公共组件
│   ├── mock/                     # Mock数据
│   ├── router/index.js
│   ├── stores/                   # Pinia状态
│   └── App.vue
└── docker-compose.yml
```

## 5. 核心页面设计

### 5.1 首页 Dashboard

- 顶部: 系统标题 + 用户信息
- 左侧: 菜单导航（14个模块）
- 右侧:
  - 统计卡片（机台数、待处理问题、FPY、DPU）
  - FPY趋势图表
  - 待办任务列表
  - 缺陷TOP10列表

### 5.2 PQM-机台追溯

- 机台列表: 搜索/筛选/分页/导出
- 机台履历详情: 配置信息、生产数据、关键件
- 追溯查询: 计划号→零部件双向查询
- FPY/DPU图表: 年/月/周/日多维度

### 5.3 QIM-质量改进

- 问题列表: 多条件筛选、状态标签
- 问题详情: 状态流转图、处理记录
- 创建问题: 表单填写、附件上传

## 6. Mock数据策略

- 每个模块独立Mock文件
- 模拟分页（每页20条）
- 图表绑定Mock数据
- 搜索/筛选实时过滤

## 7. 部署方式

- Docker Compose + Nginx
- 一键启动，纯前端运行
- 无需后端API

## 8. UI规范

- 主题色: 科技蓝 (#409EFF)
- 辅助色: 成功绿/警告橙/错误红
- 字体: 默认Element Plus字体
- 布局: 经典后台左右布局
