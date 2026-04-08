<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside :width="sidebarWidth" class="sidebar">
      <div class="logo">
        <el-icon :size="24"><Box /></el-icon>
        <span v-if="!isCollapsed">QMS 系统</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapsed"
        router
        class="sidebar-menu"
      >
        <el-menu-item index="/dashboard">
          <el-icon><Odometer /></el-icon>
          <template #title>首页</template>
        </el-menu-item>

        <el-sub-menu index="pqm">
          <template #title><el-icon><Box /></el-icon><span>PQM生产质量</span></template>
          <el-menu-item index="/pqm/machine-trace">机台追溯</el-menu-item>
          <el-menu-item index="/pqm/component">关键件追溯</el-menu-item>
          <el-menu-item index="/pqm/defect">缺陷查询</el-menu-item>
          <el-menu-item index="/pqm/report">FPY/DPU报表</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="qim">
          <template #title><el-icon><QuestionFilled /></el-icon><span>QIM质量改进</span></template>
          <el-menu-item index="/qim/problem-list">问题列表</el-menu-item>
          <el-menu-item index="/qim/problem-create">创建问题</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="qsm">
          <template #title><el-icon><FolderOpened /></el-icon><span>QSM质量文件</span></template>
          <el-menu-item index="/qsm/document">文件管理</el-menu-item>
          <el-menu-item index="/qsm/audit">体系审核</el-menu-item>
          <el-menu-item index="/qsm/objective">质量目标</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="dam">
          <template #title><el-icon><EditPen /></el-icon><span>DAM偏差管理</span></template>
          <el-menu-item index="/dam/apply">偏差申请</el-menu-item>
          <el-menu-item index="/dam/approve">偏差审批</el-menu-item>
          <el-menu-item index="/dam/record">偏差记录</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="dmm">
          <template #title><el-icon><DataAnalysis /></el-icon><span>DMM尺寸测量</span></template>
          <el-menu-item index="/dmm/plan">测量计划</el-menu-item>
          <el-menu-item index="/dmm/data">测量数据</el-menu-item>
          <el-menu-item index="/dmm/issue">尺寸问题</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="mqm">
          <template #title><el-icon><Document /></el-icon><span>MQM市场质量</span></template>
          <el-menu-item index="/mqm/tech-report">技术报告</el-menu-item>
          <el-menu-item index="/mqm/claim">问题索赔</el-menu-item>
          <el-menu-item index="/mqm/survey">机台调查</el-menu-item>
          <el-menu-item index="/mqm/data-analysis">数据分析</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="gam">
          <template #title><el-icon><Tools /></el-icon><span>GAM计量管理</span></template>
          <el-menu-item index="/gam/equipment">计量设备</el-menu-item>
          <el-menu-item index="/gam/calibration">校准计划</el-menu-item>
          <el-menu-item index="/gam/gauge">检具管理</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="sqm">
          <template #title><el-icon><Guide /></el-icon><span>SQM供应商质量</span></template>
          <el-menu-item index="/sqm/apqp">APQP管理</el-menu-item>
          <el-menu-item index="/sqm/ppap">PPAP管理</el-menu-item>
          <el-menu-item index="/sqm/performance">绩效管理</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="lab">
          <template #title><el-icon><Collection /></el-icon><span>实验室</span></template>
          <el-menu-item index="/lab/test">试验委托</el-menu-item>
          <el-menu-item index="/lab/report">报告管理</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="pam">
          <template #title><el-icon><SetUp /></el-icon><span>PAM产品评审</span></template>
          <el-menu-item index="/pam/process">过程AUDIT</el-menu-item>
          <el-menu-item index="/pam/customer">顾客评审</el-menu-item>
          <el-menu-item index="/pam/spot">一致性抽查</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="trace">
          <template #title><el-icon><Goods /></el-icon><span>机台溯源</span></template>
          <el-menu-item index="/trace/production">生产信息</el-menu-item>
          <el-menu-item index="/trace/battery">电池管理</el-menu-item>
          <el-menu-item index="/trace/sale">销售信息</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="torque">
          <template #title><el-icon><Refresh /></el-icon><span>扭矩管理</span></template>
          <el-menu-item index="/torque/sync">数据同步</el-menu-item>
          <el-menu-item index="/torque/process">数据处理</el-menu-item>
          <el-menu-item index="/torque/stat">统计分析</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="aim">
          <template #title><el-icon><HelpFilled /></el-icon><span>AIM问题改进</span></template>
          <el-menu-item index="/aim/problem">问题管理</el-menu-item>
          <el-menu-item index="/aim/search">问题检索</el-menu-item>
          <el-menu-item index="/aim/stat">统计分析</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="outbound">
          <template #title><el-icon><Box /></el-icon><span>外购件质量</span></template>
          <el-menu-item index="/outbound/incoming">来料检验</el-menu-item>
          <el-menu-item index="/outbound/ppm">PPM计算</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶部 -->
      <el-header class="header">
        <div class="header-left">
          <el-button text @click="toggleSidebar">
            <el-icon size="20"><Expand v-if="isCollapsed" /><Fold v-else /></el-icon>
          </el-button>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="$route.meta.module">{{ $route.meta.module }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-dropdown>
            <span class="user-info">
              <el-avatar :size="32" style="background: #409EFF">质量管理员</el-avatar>
              <span class="username">admin</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 主内容 -->
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Box, Odometer, QuestionFilled, FolderOpened, EditPen,
  DataAnalysis, Document, Tools, Guide,
  Goods, Refresh, Fold, Expand, SetUp,
  Collection, Coin, Timer, Connection, Warning,
  Money, TrendCharts, Aim, Checked, List,
  Calendar, Search, Operation, PieChart,
  User, Sell, DocumentCopy, Histogram,
  Plus, Delete, Edit, View
} from '@element-plus/icons-vue'

const route = useRoute()
const isCollapsed = ref(false)
const sidebarWidth = computed(() => isCollapsed.value ? '64px' : '220px')
const activeMenu = computed(() => route.path)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped lang="scss">
.layout-container {
  height: 100vh;
}

.sidebar {
  background: #001529;
  transition: width 0.3s;
  overflow-x: hidden;

  .logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .sidebar-menu {
    border-right: none;
    background: transparent;

    :deep(.el-menu) {
      background: transparent;
    }

    :deep(.el-sub-menu__title) {
      color: rgba(255,255,255,0.7);

      &:hover {
        background: rgba(255,255,255,0.1);
      }
    }

    :deep(.el-menu-item) {
      color: rgba(255,255,255,0.7);

      &:hover {
        background: rgba(255,255,255,0.1);
      }

      &.is-active {
        color: #409EFF;
        background: rgba(64,158,255,0.15);
      }
    }
  }
}

.header {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0,21,41,0.08);

  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .header-right {
    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;

      .username {
        color: #303133;
        font-size: 14px;
      }
    }
  }
}

.main-content {
  background: #f0f2f5;
  padding: 20px;
}
</style>
