<template>
  <div class="page-container">
    <h2 class="page-title">FPY/DPU报表</h2>

    <!-- 报表类型切换 -->
    <el-card shadow="hover" class="chart-card">
      <template #header>
        <el-radio-group v-model="reportType" size="default">
          <el-radio-button label="fpy">FPY报表</el-radio-button>
          <el-radio-button label="dpu">DPU报表</el-radio-button>
        </el-radio-group>
      </template>

      <!-- FPY报表 -->
      <div v-if="reportType === 'fpy'">
        <el-row :gutter="20" class="stat-row">
          <el-col :span="6">
            <div class="stat-item">
              <div class="stat-label">日FPY</div>
              <div class="stat-value success">98.5%</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="stat-item">
              <div class="stat-label">周FPY</div>
              <div class="stat-value success">98.2%</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="stat-item">
              <div class="stat-label">月FPY</div>
              <div class="stat-value success">98.5%</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="stat-item">
              <div class="stat-label">年FPY</div>
              <div class="stat-value success">97.8%</div>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <div class="chart-title">月度FPY趋势</div>
            <div ref="fpyMonthChartRef" class="chart-container"></div>
          </el-col>
          <el-col :span="12">
            <div class="chart-title">各型号FPY对比</div>
            <div ref="fpyModelChartRef" class="chart-container"></div>
          </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 20px;">
          <el-col :span="24">
            <div class="chart-title">日FPY趋势（近30天）</div>
            <div ref="fpyDailyChartRef" class="chart-container-wide"></div>
          </el-col>
        </el-row>
      </div>

      <!-- DPU报表 -->
      <div v-if="reportType === 'dpu'">
        <el-row :gutter="20" class="stat-row">
          <el-col :span="6">
            <div class="stat-item">
              <div class="stat-label">日DPU</div>
              <div class="stat-value">2.3</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="stat-item">
              <div class="stat-label">周DPU</div>
              <div class="stat-value">2.5</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="stat-item">
              <div class="stat-label">月DPU</div>
              <div class="stat-value success">2.3</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="stat-item">
              <div class="stat-label">年DPU</div>
              <div class="stat-value">2.7</div>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <div class="chart-title">月度DPU趋势</div>
            <div ref="dpuMonthChartRef" class="chart-container"></div>
          </el-col>
          <el-col :span="12">
            <div class="chart-title">缺陷类型分布</div>
            <div ref="dpuDefectChartRef" class="chart-container"></div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 导出按钮 -->
    <div class="export-bar">
      <el-button type="primary" @click="handleExport">
        <el-icon><Download /></el-icon> 导出报表
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { Download } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const reportType = ref('fpy')

let fpyMonthChart = null
let fpyModelChart = null
let fpyDailyChart = null
let dpuMonthChart = null
let dpuDefectChart = null

const fpyMonthChartRef = ref(null)
const fpyModelChartRef = ref(null)
const fpyDailyChartRef = ref(null)
const dpuMonthChartRef = ref(null)
const dpuDefectChartRef = ref(null)

const initFpyCharts = () => {
  if (fpyMonthChartRef.value) {
    fpyMonthChart = echarts.init(fpyMonthChartRef.value)
    fpyMonthChart.setOption({
      tooltip: { trigger: 'axis' },
      legend: { data: ['实际值', '目标值'], bottom: 0 },
      grid: { top: 10, right: 20, bottom: 40, left: 50 },
      xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月'] },
      yAxis: { type: 'value', min: 95, max: 100, axisLabel: { formatter: '{value}%' } },
      series: [
        { name: '实际值', type: 'line', smooth: true, data: [97.2, 97.8, 98.1, 98.5], itemStyle: { color: '#409EFF' } },
        { name: '目标值', type: 'line', data: [98, 98, 98, 98], itemStyle: { color: '#67C23A' }, lineStyle: { type: 'dashed' } }
      ]
    })
  }

  if (fpyModelChartRef.value) {
    fpyModelChart = echarts.init(fpyModelChartRef.value)
    fpyModelChart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { top: 10, right: 20, bottom: 30, left: 50 },
      xAxis: { type: 'category', data: ['类型A', '类型B', '类型C'] },
      yAxis: { type: 'value', min: 95, max: 100, axisLabel: { formatter: '{value}%' } },
      series: [
        { name: 'FPY', type: 'bar', data: [98.5, 97.2, 98.1], itemStyle: { color: '#409EFF' } }
      ]
    })
  }

  if (fpyDailyChartRef.value) {
    fpyDailyChart = echarts.init(fpyDailyChartRef.value)
    const days = Array.from({ length: 30 }, (_, i) => `${i + 1}日`)
    const data = Array.from({ length: 30 }, () => 96 + Math.random() * 3)
    fpyDailyChart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { top: 10, right: 20, bottom: 30, left: 50 },
      xAxis: { type: 'category', data: days },
      yAxis: { type: 'value', min: 95, max: 100, axisLabel: { formatter: '{value}%' } },
      series: [
        { name: '日FPY', type: 'line', smooth: true, data, itemStyle: { color: '#409EFF' } }
      ]
    })
  }
}

const initDpuCharts = () => {
  if (dpuMonthChartRef.value) {
    dpuMonthChart = echarts.init(dpuMonthChartRef.value)
    dpuMonthChart.setOption({
      tooltip: { trigger: 'axis' },
      legend: { data: ['实际值', '目标值'], bottom: 0 },
      grid: { top: 10, right: 20, bottom: 40, left: 50 },
      xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月'] },
      yAxis: { type: 'value', min: 0, max: 5 },
      series: [
        { name: '实际值', type: 'bar', data: [3.2, 2.9, 2.5, 2.3], itemStyle: { color: '#409EFF' } },
        { name: '目标值', type: 'line', data: [2.5, 2.5, 2.5, 2.5], itemStyle: { color: '#F56C6C' }, lineStyle: { type: 'dashed' } }
      ]
    })
  }

  if (dpuDefectChartRef.value) {
    dpuDefectChart = echarts.init(dpuDefectChartRef.value)
    dpuDefectChart.setOption({
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 156, name: '气密性不良' },
          { value: 134, name: '外观划伤' },
          { value: 98, name: '扭矩不足' },
          { value: 87, name: '尺寸超差' },
          { value: 76, name: '装配不良' }
        ]
      }]
    })
  }
}

const handleExport = () => {
  ElMessage.success('报表导出成功')
}

const handleResize = () => {
  fpyMonthChart?.resize()
  fpyModelChart?.resize()
  fpyDailyChart?.resize()
  dpuMonthChart?.resize()
  dpuDefectChart?.resize()
}

onMounted(() => {
  initFpyCharts()
  initDpuCharts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  fpyMonthChart?.dispose()
  fpyModelChart?.dispose()
  fpyDailyChart?.dispose()
  dpuMonthChart?.dispose()
  dpuDefectChart?.dispose()
})
</script>

<style scoped lang="scss">
.page-container {
  .page-title {
    margin: 0 0 20px 0;
    font-size: 20px;
    font-weight: 600;
    color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
  }

  .chart-card {
    .chart-title {
      font-size: 16px;
      font-weight: 600;
      color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
      margin-bottom: 10px;
    }
  }

  .stat-row {
    margin-bottom: 30px;

    .stat-item {
      background: rgba(20, 35, 60, 0.6);
      border: 1px solid rgba(0, 229, 255, 0.15);
      border-radius: 12px;
      padding: 20px;
      text-align: center;

      .stat-label {
        font-size: 14px;
        color: #94a3b8;
        margin-bottom: 8px;
      }

      .stat-value {
        font-size: 28px;
        font-weight: bold;
        color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);

        &.success {
          color: #10b981;
        }
      }
    }
  }

  .chart-container {
    height: 280px;
  }

  .chart-container-wide {
    height: 250px;
  }

  .export-bar {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
