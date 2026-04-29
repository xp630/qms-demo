<template>
  <div class="page-container">
    <h2 class="page-title">缺陷查询</h2>

    <el-card shadow="hover" class="search-card">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="缺陷编号">
          <el-input v-model="searchForm.defectNo" placeholder="请输入缺陷编号" clearable />
        </el-form-item>
        <el-form-item label="机台号">
          <el-input v-model="searchForm.machineNo" placeholder="请输入机台号" clearable />
        </el-form-item>
        <el-form-item label="计划号">
          <el-input v-model="searchForm.planNo" placeholder="请输入计划号" clearable />
        </el-form-item>
        <el-form-item label="缺陷类型">
          <el-select v-model="searchForm.defectType" placeholder="全部" clearable style="width: 150px">
            <el-option label="气密性不良" value="气密性不良" />
            <el-option label="外观划伤" value="外观划伤" />
            <el-option label="扭矩不足" value="扭矩不足" />
            <el-option label="尺寸超差" value="尺寸超差" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- TOP10 缺陷排行 -->
    <el-row :gutter="16" style="margin-bottom: 16px">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <span>缺陷TOP10 (按频次)</span>
          </template>
          <div ref="top10ChartRef" style="height: 280px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <span>缺陷趋势</span>
          </template>
          <div ref="trendChartRef" style="height: 280px"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>缺陷明细 ({{ filteredDefects.length }})</span>
          <el-button type="primary" size="small" @click="handleExport">
            <el-icon><Download /></el-icon> 导出
          </el-button>
        </div>
      </template>

      <el-table :data="filteredDefects" stripe border>
        <el-table-column prop="defectNo" label="缺陷编号" width="130" fixed />
        <el-table-column prop="machineNo" label="机台号" width="130">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleTraceMachine(row)">{{ row.machineNo }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="planNo" label="计划号" width="130">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleTracePlan(row)">{{ row.planNo }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="defectType" label="缺陷类型" width="120" />
        <el-table-column prop="count" label="发生次数" width="100" align="center" />
        <el-table-column label="严重度" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getSeverityType(row.severity)" size="small">{{ row.severity }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="findTime" label="发现时间" width="160" />
        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)" size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleViewDetail(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 缺陷详情弹窗 -->
    <el-dialog v-model="detailVisible" title="缺陷详情" width="700px" destroy-on-close>
      <el-descriptions :column="2" border v-if="currentDefect">
        <el-descriptions-item label="缺陷编号">{{ currentDefect.defectNo }}</el-descriptions-item>
        <el-descriptions-item label="缺陷类型">{{ currentDefect.defectType }}</el-descriptions-item>
        <el-descriptions-item label="机台号">{{ currentDefect.machineNo }}</el-descriptions-item>
        <el-descriptions-item label="计划号">{{ currentDefect.planNo }}</el-descriptions-item>
        <el-descriptions-item label="发生次数">{{ currentDefect.count }}</el-descriptions-item>
        <el-descriptions-item label="严重度">
          <el-tag :type="getSeverityType(currentDefect.severity)">{{ currentDefect.severity }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="发现时间">{{ currentDefect.findTime }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(currentDefect.status)">{{ currentDefect.status }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'
import { Download } from '@element-plus/icons-vue'
import { useMachineStore } from '@/store/machineStore'

const machineStore = useMachineStore()

const searchForm = reactive({ defectNo: '', machineNo: '', planNo: '', defectType: '' })
const detailVisible = ref(false)
const currentDefect = ref(null)

let top10Chart = null
let trendChart = null
const top10ChartRef = ref(null)
const trendChartRef = ref(null)

const filteredDefects = computed(() => {
  let list = machineStore.defectList
  if (searchForm.defectNo) list = list.filter(d => d.defectNo.includes(searchForm.defectNo))
  if (searchForm.machineNo) list = list.filter(d => d.machineNo.includes(searchForm.machineNo))
  if (searchForm.planNo) list = list.filter(d => d.planNo.includes(searchForm.planNo))
  if (searchForm.defectType) list = list.filter(d => d.defectType === searchForm.defectType)
  return list
})

const getSeverityType = (severity) => {
  const map = { '高': 'danger', '中': 'warning', '低': 'info' }
  return map[severity] || ''
}
const getStatusType = (status) => {
  const map = { '已返修': 'success', '处理中': 'warning', '待分析': 'info' }
  return map[status] || ''
}

const handleSearch = () => ElMessage.success('查询成功')
const handleReset = () => { Object.assign(searchForm, { defectNo: '', machineNo: '', planNo: '', defectType: '' }) }
const handleExport = () => ElMessage.success('导出成功')
const handleViewDetail = (row) => { currentDefect.value = row; detailVisible.value = true }
const handleTraceMachine = (row) => ElMessage.info(`跳转至机台 ${row.machineNo} 追溯页面`)
const handleTracePlan = (row) => ElMessage.info(`跳转至计划 ${row.planNo} 详情页面`)

const initCharts = () => {
  top10Chart = echarts.init(top10ChartRef.value)
  top10Chart.setOption({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { top: 10, right: 100, bottom: 10, left: 10 },
    xAxis: { type: 'value' },
    yAxis: { type: 'category', data: machineStore.defectTop10.map(d => d.type).reverse(), axisLabel: { fontSize: 11 } },
    series: [{
      type: 'bar',
      data: machineStore.defectTop10.map(d => ({ value: d.count, itemStyle: { color: d.trend === '上升' ? '#F56C6C' : d.trend === '下降' ? '#67C23A' : '#909399' } })).reverse(),
      label: { show: true, position: 'right', formatter: '{c}' }
    }]
  })

  trendChart = echarts.init(trendChartRef.value)
  trendChart.setOption({
    tooltip: { trigger: 'axis' },
    grid: { top: 10, right: 20, bottom: 30, left: 50 },
    xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月'] },
    yAxis: { type: 'value' },
    series: [
      { name: '缺陷数', type: 'bar', data: [145, 132, 156, 142], itemStyle: { color: '#409EFF' } },
      { name: '趋势', type: 'line', data: [145, 132, 156, 142], smooth: true, itemStyle: { color: '#F56C6C' } }
    ]
  })
}

const handleResize = () => { top10Chart?.resize(); trendChart?.resize() }

onMounted(() => { initCharts(); window.addEventListener('resize', handleResize) })
onUnmounted(() => { window.removeEventListener('resize', handleResize); top10Chart?.dispose(); trendChart?.dispose() })
</script>

<style scoped lang="scss">
.page-container {
  .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5); }
  .card-header { display: flex; justify-content: space-between; align-items: center; }
}
</style>
