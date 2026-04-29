<template>
  <div class="dashboard">
    <!-- 第一行：4个核心指标卡片 -->
    <el-row :gutter="12" style="margin-bottom: 12px;" align="stretch">
      <el-col :span="6" v-for="(stat, index) in statCards" :key="index" class="stretch-col">
        <el-card class="stat-card glow-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-info">
              <div class="stat-label">{{ stat.label }}</div>
              <div class="stat-value stat-value-animated" :class="stat.colorClass">{{ stat.value }}</div>
            </div>
          </div>
          <div class="stat-trend" v-if="stat.trend !== undefined">
            <span :class="stat.trend >= 0 ? 'up' : 'down'">
              {{ stat.trend >= 0 ? '↑' : '↓' }} {{ Math.abs(stat.trend) }}%
            </span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 第二行：缺陷TOP5 + 问题部门分布 + 机台状态 -->
    <el-row :gutter="12" style="margin-bottom: 12px;" align="stretch">
      <el-col :span="8" class="stretch-col">
        <el-card class="glow-card" style="height: 100%;">
          <template #header>
            <div class="card-header">
              <span class="card-title">缺陷TOP5</span>
            </div>
          </template>
          <div ref="defectChartRef" style="height: 160px;"></div>
        </el-card>
      </el-col>
      <el-col :span="8" class="stretch-col">
        <el-card class="glow-card" style="height: 100%;">
          <template #header>
            <div class="card-header">
              <span class="card-title">问题部门分布</span>
            </div>
          </template>
          <div ref="deptChartRef" style="height: 160px;"></div>
        </el-card>
      </el-col>
      <el-col :span="8" class="stretch-col">
        <el-card class="glow-card" style="height: 100%;">
          <template #header>
            <div class="card-header">
              <span class="card-title">机台状态</span>
            </div>
          </template>
          <div ref="machineStatusChartRef" style="height: 160px;"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 第三行：问题动态 + 待办 + FPY趋势 -->
    <el-row :gutter="12" align="stretch">
      <el-col :span="8" class="stretch-col">
        <el-card class="glow-card" style="height: 100%;">
          <template #header>
            <div class="card-header">
              <span class="card-title">问题处理动态</span>
              <el-button type="primary" size="small" link @click="$router.push('/qim/problem-list')">全部</el-button>
            </div>
          </template>
          <el-table :data="problemDynamic" size="small">
            <el-table-column prop="problemNo" label="问题编号" width="100" />
            <el-table-column prop="title" label="问题标题" show-overflow-tooltip />
            <el-table-column prop="level" label="等级" width="50" align="center">
              <template #default="{ row }">
                <el-tag :type="getLevelType(row.level)" effect="dark" size="small">{{ row.level }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="70" align="center">
              <template #default="{ row }">
                <el-tag :type="getStatusType(row.status)" size="small">{{ row.status }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="8" class="stretch-col">
        <el-card class="glow-card" style="height: 100%;">
          <template #header>
            <div class="card-header">
              <span class="card-title">待办任务</span>
              <el-badge :value="todoList.length" :max="99">
                <el-button type="primary" size="small" link>更多</el-button>
              </el-badge>
            </div>
          </template>
          <div class="todo-list">
            <div v-for="todo in todoList.slice(0, 5)" :key="todo.id" class="todo-item">
              <div class="todo-info">
                <el-tag :type="getLevelTagType(todo.level)" size="small" effect="dark">{{ todo.level }}</el-tag>
                <span class="todo-title">{{ todo.title }}</span>
              </div>
              <div class="todo-meta">
                <span class="todo-type">{{ todo.type }}</span>
                <span class="todo-deadline" :class="{ overdue: isOverdue(todo.deadline) }">{{ todo.deadline }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8" class="stretch-col">
        <el-card class="glow-card" style="height: 100%;">
          <template #header>
            <div class="card-header">
              <span class="card-title">FPY趋势</span>
              <el-radio-group v-model="fpyPeriod" size="small" class="cyber-radio">
                <el-radio-button label="monthly">月</el-radio-button>
                <el-radio-button label="weekly">周</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div ref="fpyChartRef" style="height: 100%;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import { Calendar, Box, QuestionFilled, Warning, Timer, Checked } from '@element-plus/icons-vue'
import { useMachineStore } from '@/store/machineStore'
import { useProblemStore } from '@/store/problemStore'
import { useQualityStore } from '@/store/qualityStore'
import { getProgressColor } from '@/utils/qualityColors'

const router = useRouter()
const machineStore = useMachineStore()
const problemStore = useProblemStore()
const qualityStore = useQualityStore()

const fpyPeriod = ref('monthly')
const dpuPeriod = ref('monthly')
const bulletinEnabled = ref(true)

let fpyChart = null
let defectChart = null
let machineStatusChart = null
let deptChart = null

const fpyChartRef = ref(null)
const defectChartRef = ref(null)
const machineStatusChartRef = ref(null)
const deptChartRef = ref(null)

const statCards = reactive([
  { label: '机台总数', value: 1256, icon: Box, color: '#409EFF', colorClass: 'cyan', trend: 2.3 },
  { label: '待处理问题', value: 23, icon: QuestionFilled, color: '#fbbf24', colorClass: 'orange', trend: -5.1 },
  { label: 'FPY达标率', value: '98.5%', icon: Checked, color: '#67C23A', colorClass: 'green', trend: 0.8 },
  { label: '待审核偏差', value: 8, icon: Warning, color: '#F56C6C', colorClass: 'red', trend: 12.5 }
])

const problemDynamic = ref([
  { problemNo: 'Q2024-001', title: '焊接不良导致气密性不合格', level: 'S', status: '处理中', progress: 2 },
  { problemNo: 'Q2024-002', title: '来料尺寸超差', level: 'A', status: '待分发', progress: 0 },
  { problemNo: 'Q2024-004', title: '扭矩数据异常', level: 'A', status: '处理中', progress: 1 },
  { problemNo: 'Q2024-005', title: '零部件装配偏差', level: 'C', status: '待验证', progress: 3 }
])

const todoList = ref([
  { id: 1, title: '审核M20240006偏差申请', type: '待审批', level: '紧急', deadline: '2024-04-08' },
  { id: 2, title: '确认焊接工位返修结果', type: '待验证', level: '重要', deadline: '2024-04-09' },
  { id: 3, title: '更新APQP进度报告', type: '待处理', level: '普通', deadline: '2024-04-10' },
  { id: 4, title: '批准扭矩校准计划', type: '待审批', level: '重要', deadline: '2024-04-08' },
  { id: 5, title: '复核来料检验报告', type: '待处理', level: '普通', deadline: '2024-04-11' }
])

const qualityBulletin = ref([
  { type: 'S级问题', message: '焊接不良导致气密性不合格 - 待处理' },
  { type: 'FPY告警', message: '类型B机台FPY低于目标值' },
  { type: '待审批', message: '5项偏差申请待审批' },
  { type: '计量临期', message: '3台计量设备即将到期' }
])

const getLevelType = (level) => problemStore.getLevelType(level)
const getStatusType = (status) => problemStore.getStatusType(status)

const getLevelTagType = (level) => {
  const map = { '紧急': 'danger', '重要': 'warning', '普通': 'info' }
  return map[level] || 'info'
}

const getBulletinType = (type) => {
  const map = { 'S级问题': 'error', 'FPY告警': 'warning', '待审批': 'info', '计量临期': 'warning' }
  return map[type] || 'info'
}

const isOverdue = (deadline) => {
  return new Date(deadline) < new Date()
}

const initCharts = () => {
  fpyChart = echarts.init(fpyChartRef.value)
  fpyChart.setOption({
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(6, 9, 18, 0.95)', borderColor: '#00e5ff', textStyle: { color: '#f0f4ff' } },
    legend: { data: ['实际值', '目标值'], bottom: 0, textStyle: { color: '#94a3b8' } },
    grid: { top: 8, right: 15, bottom: 25, left: 40 },
    xAxis: { type: 'category', data: machineStore.fpyTrendData.months, axisLabel: { color: '#94a3b8', fontSize: 10 }, axisLine: { lineStyle: { color: '#00e5ff' } } },
    yAxis: { type: 'value', min: 95, max: 100, axisLabel: { formatter: '{value}%', color: '#94a3b8', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0, 229, 255, 0.1)' } } },
    series: [
      { name: '实际值', type: 'line', data: machineStore.fpyTrendData.actual, smooth: true, itemStyle: { color: '#10b981' }, lineStyle: { color: '#10b981' } },
      { name: '目标值', type: 'line', data: machineStore.fpyTrendData.target, smooth: true, lineStyle: { type: 'dashed', color: '#00e5ff' }, itemStyle: { color: '#00e5ff' } }
    ]
  })

  defectChart = echarts.init(defectChartRef.value)
  const defectData = machineStore.defectTop10.slice(0, 5)
  const trendColors = { '上升': '#ef4444', '下降': '#10b981', '持平': '#c084fc' }
  defectChart.setOption({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(6, 9, 18, 0.95)', borderColor: '#00e5ff', textStyle: { color: '#f0f4ff' } },
    legend: {
      data: ['上升', '下降', '持平'],
      bottom: 0,
      textStyle: { color: '#94a3b8', fontSize: 9 },
      itemWidth: 12,
      itemHeight: 8
    },
    grid: { top: 5, right: 60, bottom: 30, left: 5 },
    xAxis: { type: 'value', axisLabel: { color: '#94a3b8', fontSize: 9 }, axisLine: { lineStyle: { color: '#00e5ff' } }, splitLine: { lineStyle: { color: 'rgba(0, 229, 255, 0.1)' } } },
    yAxis: { type: 'category', data: defectData.map(d => d.type).reverse(), axisLabel: { fontSize: 9, color: '#94a3b8' } },
    series: [{
      type: 'bar',
      data: defectData.map(d => ({ value: d.count, itemStyle: { color: trendColors[d.trend] || '#c084fc' } })).reverse(),
      label: { show: true, position: 'right', formatter: '{c}', color: '#94a3b8', fontSize: 9 }
    }]
  })

  machineStatusChart = echarts.init(machineStatusChartRef.value)
  const machineData = machineStore.getAllMachines()
  const statusCount = { '正常': 0, '异常': 0, '维护中': 0 }
  machineData.forEach(m => { statusCount[m.status] = (statusCount[m.status] || 0) + 1 })
  const statusColors = { '正常': '#10b981', '异常': '#ef4444', '维护中': '#f59e0b' }
  const statusEntries = Object.entries(statusCount)
  machineStatusChart.setOption({
    tooltip: { trigger: 'item', backgroundColor: 'rgba(6, 9, 18, 0.95)', borderColor: '#00e5ff', textStyle: { color: '#f0f4ff' } },
    legend: { orient: 'vertical', right: 10, top: 'center', textStyle: { color: '#94a3b8', fontSize: 10 }, itemWidth: 12, itemHeight: 12 },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['35%', '50%'],
      label: { show: false },
      labelLine: { show: false },
      data: statusEntries.map(([name, value]) => ({ name, value, itemStyle: { color: statusColors[name] } })),
      itemStyle: { borderColor: '#0d1525', borderWidth: 2 }
    }]
  })

  deptChart = echarts.init(deptChartRef.value)
  const deptData = {}
  const deptColors = ['#00e5ff', '#c084fc', '#10b981', '#f59e0b', '#ef4444']
  problemStore.problemList.forEach(p => { deptData[p.dept] = (deptData[p.dept] || 0) + 1 })
  const deptKeys = Object.keys(deptData)
  deptChart.setOption({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(6, 9, 18, 0.95)', borderColor: '#00e5ff', textStyle: { color: '#f0f4ff' } },
    legend: { data: deptKeys, bottom: 0, textStyle: { color: '#94a3b8', fontSize: 9 }, itemWidth: 12, itemHeight: 8 },
    grid: { top: 5, right: 5, bottom: 30, left: 5 },
    xAxis: { type: 'category', data: deptKeys, axisLabel: { rotate: 0, fontSize: 9, color: '#94a3b8' }, axisLine: { lineStyle: { color: '#00e5ff' } } },
    yAxis: { type: 'value', axisLabel: { color: '#94a3b8', fontSize: 9 }, splitLine: { lineStyle: { color: 'rgba(0, 229, 255, 0.1)' } } },
    series: [{ type: 'bar', data: deptKeys.map((k, i) => ({ value: deptData[k], itemStyle: { color: deptColors[i % deptColors.length] } })) }]
  })
}

const handleResize = () => {
  fpyChart?.resize()
  defectChart?.resize()
  machineStatusChart?.resize()
  deptChart?.resize()
}

onMounted(() => {
  initCharts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  fpyChart?.dispose()
  defectChart?.dispose()
  machineStatusChart?.dispose()
  deptChart?.dispose()
})
</script>

<style scoped lang="scss">
.dashboard {
  :deep(.el-col) {
    display: flex;
    flex-direction: column;
  }

  :deep(.el-card) {
    flex: 1;
  }

  .stat-card {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .stat-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .stat-info {
        .stat-label {
          font-size: 12px;
          color: #8b9dc3;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .stat-value {
          font-size: 26px;
          font-weight: 700;
        }
      }
    }

    .stat-trend {
      font-size: 11px;
      color: #64748b;
      margin-top: 6px;

      .up { color: #10b981; }
      .down { color: #ef4444; }
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;

    .card-title {
      color: #00e5ff;
      font-weight: 600;
      font-size: 13px;
      text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
    }
  }

  .todo-list {
    max-height: 220px;
    overflow-y: auto;

    .todo-item {
      padding: 6px 0;
      border-bottom: 1px solid rgba(0, 229, 255, 0.06);

      &:last-child { border-bottom: none; }

      .todo-info {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 3px;

        .todo-title {
          font-size: 12px;
          color: #f0f4ff;
        }
      }

      .todo-meta {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        color: #64748b;

        .todo-deadline.overdue { color: #ef4444; }
      }
    }

    &::-webkit-scrollbar { width: 3px; }
    &::-webkit-scrollbar-track { background: rgba(0, 229, 255, 0.05); }
    &::-webkit-scrollbar-thumb { background: rgba(0, 229, 255, 0.2); border-radius: 2px; }
  }
}
</style>
