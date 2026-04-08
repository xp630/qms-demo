<template>
  <div class="page-container">
    <h2 class="page-title">质量目标</h2>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header><span>质量目标概览</span></template>
          <el-table :data="objectiveList" stripe border>
            <el-table-column prop="dept" label="部门" />
            <el-table-column prop="target" label="目标值" align="center" />
            <el-table-column prop="actual" label="实际值" align="center" />
            <el-table-column prop="rate" label="达成率" align="center">
              <template #default="{ row }">
                <el-tag :type="row.rate >= 100 ? 'success' : row.rate >= 90 ? 'warning' : 'danger'">
                  {{ row.rate }}%
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header><span>目标达成趋势</span></template>
          <div ref="chartRef" style="height: 300px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const objectiveList = ref([
  { dept: '生产部', target: '98%', actual: '98.5%', rate: 100.5 },
  { dept: '质量部', target: '95%', actual: '94.2%', rate: 99.2 },
  { dept: '采购部', target: '97%', actual: '96.8%', rate: 99.8 },
  { dept: '设备部', target: '96%', actual: '95.5%', rate: 99.5 }
])

let chart = null
const chartRef = ref(null)

onMounted(() => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    chart.setOption({
      tooltip: { trigger: 'axis' },
      legend: { data: ['目标', '实际'], bottom: 0 },
      grid: { top: 10, right: 20, bottom: 40, left: 50 },
      xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月'] },
      yAxis: { type: 'value', min: 90, max: 100, axisLabel: { formatter: '{value}%' } },
      series: [
        { name: '目标', type: 'line', data: [98, 98, 98, 98], itemStyle: { color: '#67C23A' }, lineStyle: { type: 'dashed' } },
        { name: '实际', type: 'line', smooth: true, data: [97.2, 97.8, 98.1, 98.5], itemStyle: { color: '#409EFF' } }
      ]
    })
  }
  window.addEventListener('resize', () => chart?.resize())
})

onUnmounted(() => { chart?.dispose() })
</script>

<style scoped lang="scss">
.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }
</style>
