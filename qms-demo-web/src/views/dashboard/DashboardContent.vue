<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stat-row">
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="background: #409EFF">
            <el-icon :size="32"><Box /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ stats.machineCount.toLocaleString() }}</div>
            <div class="stat-label">机台总数</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="background: #E6A23C">
            <el-icon :size="32"><QuestionFilled /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ stats.pendingProblems }}</div>
            <div class="stat-label">待处理问题</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="background: #67C23A">
            <el-icon :size="32"><CircleCheck /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ stats.fpyRate }}%</div>
            <div class="stat-label">FPY达标率</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="background: #F56C6C">
            <el-icon :size="32"><Warning /></el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ stats.dpu }}</div>
            <div class="stat-label">DPU均值</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>FPY趋势</span>
              <el-radio-group v-model="fpyPeriod" size="small">
                <el-radio-button label="月">月</el-radio-button>
                <el-radio-button label="周">周</el-radio-button>
                <el-radio-button label="日">日</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div ref="fpyChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>DPU趋势</span>
              <el-radio-group v-model="dpuPeriod" size="small">
                <el-radio-button label="月">月</el-radio-button>
                <el-radio-button label="周">周</el-radio-button>
                <el-radio-button label="日">日</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div ref="dpuChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 下方两列 -->
    <el-row :gutter="20" class="bottom-row">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>待办任务</span>
              <el-button type="primary" link size="small">查看全部</el-button>
            </div>
          </template>
          <el-table :data="todoList" style="width: 100%">
            <el-table-column prop="title" label="任务名称" show-overflow-tooltip />
            <el-table-column prop="type" label="类型" width="100">
              <template #default="{ row }">
                <el-tag :type="getTypeTagType(row.type)" size="small">{{ row.type }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="level" label="级别" width="80">
              <template #default="{ row }">
                <el-tag :type="getLevelTagType(row.level)" size="small">{{ row.level }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="deadline" label="截止日期" width="110" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>缺陷TOP10</span>
              <el-button type="primary" link size="small">查看全部</el-button>
            </div>
          </template>
          <div ref="defectTopChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { Box, QuestionFilled, CircleCheck, Warning } from '@element-plus/icons-vue'
import { dashboardStats, fpyTrendData, dpuTrendData, todoList, defectTop10 } from '@/mock'

const stats = dashboardStats
const fpyPeriod = ref('月')
const dpuPeriod = ref('月')

let fpyChart = null
let dpuChart = null
let defectTopChart = null
const fpyChartRef = ref(null)
const dpuChartRef = ref(null)
const defectTopChartRef = ref(null)

const getTypeTagType = (type) => {
  const map = { '待审批': 'warning', '待验证': 'info', '待处理': 'success' }
  return map[type] || ''
}

const getLevelTagType = (level) => {
  const map = { '紧急': 'danger', '重要': 'warning', '普通': 'info' }
  return map[level] || ''
}

const initFpyChart = () => {
  if (!fpyChartRef.value) return
  fpyChart = echarts.init(fpyChartRef.value)
  fpyChart.setOption({
    tooltip: { trigger: 'axis' },
    legend: { data: ['实际值', '目标值'], bottom: 0 },
    grid: { top: 20, right: 20, bottom: 40, left: 50 },
    xAxis: { type: 'category', data: fpyTrendData.months },
    yAxis: { type: 'value', min: 95, max: 100, axisLabel: { formatter: '{value}%' } },
    series: [
      { name: '实际值', type: 'line', smooth: true, data: fpyTrendData.actual, itemStyle: { color: '#409EFF' } },
      { name: '目标值', type: 'line', smooth: true, data: fpyTrendData.target, itemStyle: { color: '#67C23A' }, lineStyle: { type: 'dashed' } }
    ]
  })
}

const initDpuChart = () => {
  if (!dpuChartRef.value) return
  dpuChart = echarts.init(dpuChartRef.value)
  dpuChart.setOption({
    tooltip: { trigger: 'axis' },
    legend: { data: ['实际值', '目标值'], bottom: 0 },
    grid: { top: 20, right: 20, bottom: 40, left: 50 },
    xAxis: { type: 'category', data: dpuTrendData.months },
    yAxis: { type: 'value', min: 0, max: 5 },
    series: [
      { name: '实际值', type: 'bar', data: dpuTrendData.actual, itemStyle: { color: '#409EFF' } },
      { name: '目标值', type: 'line', smooth: true, data: dpuTrendData.target, itemStyle: { color: '#F56C6C' }, lineStyle: { type: 'dashed' } }
    ]
  })
}

const initDefectTopChart = () => {
  if (!defectTopChartRef.value) return
  defectTopChart = echarts.init(defectTopChartRef.value)
  defectTopChart.setOption({
    tooltip: { trigger: 'axis', axisAngle: -90 },
    grid: { top: 10, right: 100, bottom: 10, left: 10 },
    xAxis: { type: 'value' },
    yAxis: { type: 'category', data: defectTop10.map(d => d.type).reverse() },
    series: [{
      type: 'bar',
      data: defectTop10.map(d => d.count).reverse(),
      itemStyle: {
        color: (params) => {
          const colors = ['#F56C6C', '#E6A23C', '#E6A23C', '#67C23A', '#67C23A', '#409EFF', '#409EFF', '#909399', '#909399', '#909399']
          return colors[params.dataIndex]
        }
      },
      label: { show: true, position: 'right', formatter: '{c}' }
    }]
  })
}

const handleResize = () => {
  fpyChart?.resize()
  dpuChart?.resize()
  defectTopChart?.resize()
}

onMounted(() => {
  initFpyChart()
  initDpuChart()
  initDefectTopChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  fpyChart?.dispose()
  dpuChart?.dispose()
  defectTopChart?.dispose()
})
</script>

<style scoped lang="scss">
.dashboard {
  .stat-row {
    margin-bottom: 20px;
  }

  .chart-row, .bottom-row {
    margin-bottom: 20px;
  }

  .stat-card {
    display: flex;
    align-items: center;
    padding: 10px;

    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      margin-right: 16px;
    }

    .stat-info {
      .stat-value {
        font-size: 28px;
        font-weight: bold;
        color: #303133;
      }
      .stat-label {
        font-size: 14px;
        color: #909399;
        margin-top: 4px;
      }
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chart-container {
    height: 280px;
  }
}
</style>
