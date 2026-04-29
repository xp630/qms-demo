<template>
  <div class="cyber-grid-bg"></div>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside :width="sidebarWidth" class="sidebar">
      <div class="logo">
        <el-icon :size="24" class="logo-icon"><Box /></el-icon>
        <span v-if="!isCollapsed" class="logo-text">QMS 系统</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapsed"
        router
        class="sidebar-menu"
        :background-color="'transparent'"
        :text-color="'rgba(224, 240, 255, 0.7)'"
        :active-text-color="'#00f5ff'"
      >
        <el-menu-item index="/dashboard">
          <el-icon><Odometer /></el-icon>
          <template #title>首页</template>
        </el-menu-item>

        <!-- 一级目录：质量管理 (QSM + QIM + AIM) -->
        <el-sub-menu index="quality-mgmt">
          <template #title><el-icon><FolderOpened /></el-icon><span>质量管理</span></template>
          <!-- QSM 质量文件 -->
          <el-sub-menu index="qsm-group">
            <template #title><el-icon><Document /></el-icon><span>质量文件</span></template>
            <el-menu-item index="/qsm/document">文件管理</el-menu-item>
            <el-menu-item index="/qsm/audit">体系审核</el-menu-item>
            <el-menu-item index="/qsm/objective">质量目标</el-menu-item>
          </el-sub-menu>
          <!-- QIM 质量改进 -->
          <el-sub-menu index="qim-group">
            <template #title><el-icon><QuestionFilled /></el-icon><span>质量改进</span></template>
            <el-menu-item index="/qim/problem-list">问题列表</el-menu-item>
            <el-menu-item index="/qim/problem-create">创建问题</el-menu-item>
            <el-menu-item index="/qim/problem-definition">问题定义</el-menu-item>
            <el-menu-item index="/qim/problem-confirm">问题确认分发</el-menu-item>
            <el-menu-item index="/qim/problem-handling">问题处理</el-menu-item>
            <el-menu-item index="/qim/problem-library">问题库</el-menu-item>
          </el-sub-menu>
          <!-- AIM 问题改进 -->
          <el-sub-menu index="aim-group">
            <template #title><el-icon><HelpFilled /></el-icon><span>问题改进</span></template>
            <el-menu-item index="/aim/problem">问题管理</el-menu-item>
            <el-menu-item index="/aim/search">问题检索</el-menu-item>
            <el-menu-item index="/aim/stat">统计分析</el-menu-item>
            <el-menu-item index="/aim/status">状态管理</el-menu-item>
            <el-menu-item index="/aim/time">时间管理</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>

        <!-- 一级目录：生产质量 (PQM + DAM + DMM) -->
        <el-sub-menu index="production-mgmt">
          <template #title><el-icon><Box /></el-icon><span>生产质量</span></template>
          <!-- PQM 生产质量 -->
          <el-sub-menu index="pqm-group">
            <template #title><el-icon><DataLine /></el-icon><span>生产管理</span></template>
            <el-menu-item index="/pqm/machine-trace">机台追溯</el-menu-item>
            <el-menu-item index="/pqm/component">关键件追溯</el-menu-item>
            <el-menu-item index="/pqm/defect">缺陷查询</el-menu-item>
            <el-menu-item index="/pqm/report">FPY/DPU报表</el-menu-item>
          </el-sub-menu>
          <!-- DAM 偏差管理 -->
          <el-sub-menu index="dam-group">
            <template #title><el-icon><EditPen /></el-icon><span>偏差管理</span></template>
            <el-menu-item index="/dam/apply">偏差申请</el-menu-item>
            <el-menu-item index="/dam/approve">偏差审批</el-menu-item>
            <el-menu-item index="/dam/implementation">偏差实施</el-menu-item>
            <el-menu-item index="/dam/report">偏差报告</el-menu-item>
            <el-menu-item index="/dam/close">偏差关闭</el-menu-item>
            <el-menu-item index="/dam/record">偏差记录</el-menu-item>
          </el-sub-menu>
          <!-- DMM 尺寸测量 -->
          <el-sub-menu index="dmm-group">
            <template #title><el-icon><DataAnalysis /></el-icon><span>尺寸测量</span></template>
            <el-menu-item index="/dmm/plan">测量计划</el-menu-item>
            <el-menu-item index="/dmm/data">测量数据</el-menu-item>
            <el-menu-item index="/dmm/issue">尺寸问题</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>

        <!-- 一级目录：供应商质量 (SQM + OUTBOUND) -->
        <el-sub-menu index="supplier-mgmt">
          <template #title><el-icon><Guide /></el-icon><span>供应商质量</span></template>
          <!-- SQM 供应商 -->
          <el-sub-menu index="sqm-group">
            <template #title><el-icon><Connection /></el-icon><span>供应商管理</span></template>
            <el-menu-item index="/sqm/apqp">APQP管理</el-menu-item>
            <el-menu-item index="/sqm/ppap">PPAP管理</el-menu-item>
            <el-menu-item index="/sqm/performance">绩效管理</el-menu-item>
            <el-menu-item index="/sqm/incoming-inspection">来料检验</el-menu-item>
          </el-sub-menu>
          <!-- 外购件 -->
          <el-sub-menu index="outbound-group">
            <template #title><el-icon><Box /></el-icon><span>外购件管理</span></template>
            <el-menu-item index="/outbound/incoming">来料检验</el-menu-item>
            <el-menu-item index="/outbound/ppm">PPM计算</el-menu-item>
            <el-menu-item index="/outbound/controlled">受控发运</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>

        <!-- 一级目录：市场质量 (MQM + LAB + PAM) -->
        <el-sub-menu index="market-mgmt">
          <template #title><el-icon><TrendCharts /></el-icon><span>市场质量</span></template>
          <!-- MQM 市场质量 -->
          <el-sub-menu index="mqm-group">
            <template #title><el-icon><Money /></el-icon><span>市场质量</span></template>
            <el-menu-item index="/mqm/tech-report">技术报告</el-menu-item>
            <el-menu-item index="/mqm/claim">问题索赔</el-menu-item>
            <el-menu-item index="/mqm/survey">机台调查</el-menu-item>
            <el-menu-item index="/mqm/data-analysis">数据分析</el-menu-item>
          </el-sub-menu>
          <!-- LAB 实验室 -->
          <el-sub-menu index="lab-group">
            <template #title><el-icon><Collection /></el-icon><span>实验室</span></template>
            <el-menu-item index="/lab/test">试验委托</el-menu-item>
            <el-menu-item index="/lab/report">报告管理</el-menu-item>
          </el-sub-menu>
          <!-- PAM 产品评审 -->
          <el-sub-menu index="pam-group">
            <template #title><el-icon><SetUp /></el-icon><span>产品评审</span></template>
            <el-menu-item index="/pam/process">过程AUDIT</el-menu-item>
            <el-menu-item index="/pam/customer">顾客评审</el-menu-item>
            <el-menu-item index="/pam/spot">一致性抽查</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>

        <!-- 一级目录：设备工具 (GAM + TORQUE + TRACE) -->
        <el-sub-menu index="equipment-tools">
          <template #title><el-icon><Tools /></el-icon><span>设备工具</span></template>
          <!-- GAM 计量管理 -->
          <el-sub-menu index="gam-group">
            <template #title><el-icon><Aim /></el-icon><span>计量管理</span></template>
            <el-menu-item index="/gam/equipment">计量设备</el-menu-item>
            <el-menu-item index="/gam/calibration">校准计划</el-menu-item>
            <el-menu-item index="/gam/gauge">检具管理</el-menu-item>
          </el-sub-menu>
          <!-- TORQUE 扭矩管理 -->
          <el-sub-menu index="torque-group">
            <template #title><el-icon><Refresh /></el-icon><span>扭矩管理</span></template>
            <el-menu-item index="/torque/sync">数据同步</el-menu-item>
            <el-menu-item index="/torque/process">数据处理</el-menu-item>
            <el-menu-item index="/torque/stat">统计分析</el-menu-item>
          </el-sub-menu>
          <!-- TRACE 机台溯源 -->
          <el-sub-menu index="trace-group">
            <template #title><el-icon><Goods /></el-icon><span>机台溯源</span></template>
            <el-menu-item index="/trace/production">生产信息</el-menu-item>
            <el-menu-item index="/trace/battery">电池管理</el-menu-item>
            <el-menu-item index="/trace/sale">销售信息</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶部 -->
      <el-header class="header">
        <div class="header-left">
          <el-button text @click="toggleSidebar" class="header-btn">
            <el-icon size="20"><Expand v-if="isCollapsed" /><Fold v-else /></el-icon>
          </el-button>
          <el-breadcrumb separator="/" class="cyber-breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="$route.meta.module">{{ $route.meta.module }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-dropdown>
            <span class="user-info">
              <el-avatar :size="32" class="user-avatar">质</el-avatar>
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
  Plus, Delete, Edit, View, DataLine,
  HelpFilled
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
  position: relative;
  z-index: 1;
}

.sidebar {
  background: rgba(15, 28, 50, 0.95) !important;
  border-right: 1px solid rgba(0, 200, 255, 0.2) !important;
  transition: width 0.3s;
  overflow-x: hidden;

  .logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-bottom: 1px solid rgba(0, 200, 255, 0.15);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 10%;
      right: 10%;
      height: 1px;
      background: linear-gradient(90deg, transparent, #00d4ff, transparent);
      box-shadow: 0 0 8px rgba(0, 212, 255, 0.5);
    }

    .logo-icon {
      color: #00d4ff;
      filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.6));
      animation: glow-pulse 2s ease-in-out infinite;
    }

    .logo-text {
      color: #00d4ff;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 2px;
      text-shadow: 0 0 10px rgba(0, 212, 255, 0.6);
    }
  }

  .sidebar-menu {
    border-right: none;
    background: transparent !important;

    :deep(.el-sub-menu__title) {
      color: #8b9dc3 !important;
      font-size: 14px;
      transition: var(--transition-glow);

      &:hover {
        background: rgba(0, 200, 255, 0.08) !important;
        color: #00d4ff !important;
      }
    }

    :deep(.el-menu-item) {
      color: #8b9dc3 !important;
      font-size: 14px;
      transition: var(--transition-glow);
      border-left: 3px solid transparent;

      &:hover {
        background: rgba(0, 200, 255, 0.08) !important;
        color: #00d4ff !important;
        border-left-color: #00d4ff;
      }

      &.is-active {
        color: #00d4ff !important;
        background: rgba(0, 200, 255, 0.12) !important;
        border-left: 3px solid #00d4ff;
        text-shadow: 0 0 10px rgba(0, 212, 255, 0.6);
      }
    }

    :deep(.el-sub-menu .el-menu) {
      background: rgba(0, 0, 0, 0.2) !important;
    }

    :deep(.el-sub-menu__title .el-icon) {
      color: inherit;
    }
  }
}

.header {
  background: rgba(13, 21, 37, 0.98) !important;
  border-bottom: 1px solid var(--border-default);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);

  .header-btn {
    color: var(--text-secondary) !important;
    transition: var(--transition-glow);

    &:hover {
      color: var(--neon-cyan) !important;
    }
  }

  .cyber-breadcrumb {
    :deep(.el-breadcrumb__inner) {
      color: var(--text-muted) !important;
      transition: var(--transition-fast);
    }

    :deep(.el-breadcrumb__inner.is-link:hover) {
      color: var(--neon-cyan) !important;
    }

    :deep(.el-breadcrumb__separator) {
      color: var(--text-muted) !important;
    }

    :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
      color: var(--text-primary) !important;
    }
  }

  .header-right {
    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: var(--transition-glow);

      &:hover .username {
        color: var(--neon-cyan);
        text-shadow: 0 0 8px var(--neon-cyan);
      }

      .user-avatar {
        background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple)) !important;
        color: var(--bg-primary) !important;
        font-weight: 700;
        box-shadow: 0 0 12px rgba(0, 245, 255, 0.4);
      }

      .username {
        color: var(--text-secondary);
        font-size: 14px;
        transition: var(--transition-glow);
      }
    }
  }
}

.main-content {
  background: transparent !important;
  padding: 20px;
  position: relative;
}

@keyframes glow-pulse {
  0%, 100% { filter: drop-shadow(0 0 6px var(--neon-cyan)); }
  50% { filter: drop-shadow(0 0 15px var(--neon-cyan)); }
}
</style>
