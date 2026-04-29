<template>
  <div class="page-container">
    <h2 class="page-title">偏差报告</h2>

    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>偏差统计报表</span>
          <div>
            <el-radio-group v-model="reportType" size="small" style="margin-right: 10px">
              <el-radio-button label="weekly">周报</el-radio-button>
              <el-radio-button label="monthly">月报</el-radio-button>
            </el-radio-group>
            <el-button type="primary" @click="handleExport">
              <el-icon><Download /></el-icon> 导出
            </el-button>
          </div>
        </div>
      </template>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-statistic title="本周新增偏差" :value="weeklyStats.newCount" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="本周关闭偏差" :value="weeklyStats.closedCount" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="待审批偏差" :value="weeklyStats.pendingCount" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="实施中偏差" :value="weeklyStats.implementingCount" />
        </el-col>
      </el-row>

      <el-divider />

      <el-row :gutter="20">
        <el-col :span="12">
          <div ref="statusChartRef" style="height: 280px"></div>
        </el-col>
        <el-col :span="12">
          <div ref="trendChartRef" style="height: 280px"></div>
        </el-col>
      </el-row>
    </el-card>

    <el-card style="margin-top: 16px">
      <template #header>
        <span>偏差明细</span>
      </template>
      <el-table :data="damRecords" stripe border>
        <el-table-column prop="damNo" label="偏差单号" width="130" />
        <el-table-column prop="description" label="偏差描述" min-width="200" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建日期" width="120" align="center" />
        <el-table-column prop="closeDate" label="关闭日期" width="120" align="center">
          <template #default="{ row }">
            {{ row.closeDate || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="版本" width="80" align="center">
          <template #default="{ row }">
            <el-tag size="small">{{ row.currentVersion || row.versions?.[0] || '-' }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'
import { Download } from '@element-plus/icons-vue'
import { useDamStore } from '@/store/damStore'

const damStore = useDamStore()

const reportType = ref('weekly')
let statusChart = null
let trendChart = null
const statusChartRef = ref(null)
const trendChartRef = ref(null)

const weeklyStats = reactive({
  newCount: 5,
  closedCount: 3,
  pendingCount: 8,
  implementingCount: 4
})

const damRecords = computed(() => damStore.damRecords)

const getStatusType = (status) => damStore.getStatusType(status)

const initCharts = () => {
  statusChart = echarts.init(statusChartRef.value)
  statusChart.setOption({
    title: { text: '偏差状态分布', left: 'center', textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'item' },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      data: [
        { value: 8, name: '待审批' },
        { value: 4, name: '实施中' },
        { value: 5, name: '已关闭' },
        { value: 2, name: '已拒绝' }
      ]
    }]
  })

  trendChart = echarts.init(trendChartRef.value)
  trendChart.setOption({
    title: { text: '偏差趋势', left: 'center', textStyle: { fontSize: 14 } },
    tooltip: { trigger: 'axis' },
    grid: { top: 30, right: 20, bottom: 30, left: 50 },
    xAxis: { type: 'category', data: ['第1周', '第2周', '第3周', '第4周'] },
    yAxis: { type: 'value' },
    series: [
      { name: '新增', type: 'bar', data: [3, 5, 4, 5], itemStyle: { color: '#409EFF' } },
      { name: '关闭', type: 'bar', data: [2, 3, 5, 3], itemStyle: { color: '#67C23A' } }
    ]
  })
}

const handleExport = () => {
  ElMessage.success('导出成功')
}

const handleResize = () => {
  statusChart?.resize()
  trendChart?.resize()
}

onMounted(() => {
  initCharts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  statusChart?.dispose()
  trendChart?.dispose()
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

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
