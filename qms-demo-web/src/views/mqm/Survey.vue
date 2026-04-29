<template>
  <div class="page-container">
    <h2 class="page-title">机台调查</h2>

    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>调查列表 ({{ surveyList.length }})</span>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon> 新建调查
          </el-button>
        </div>
      </template>

      <el-table :data="surveyList" stripe border>
        <el-table-column prop="surveyNo" label="调查单号" width="130" fixed />
        <el-table-column prop="machineNo" label="机台号" width="120" />
        <el-table-column prop="surveyType" label="调查类型" width="120" align="center" />
        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="surveyor" label="调查人" width="100" align="center" />
        <el-table-column prop="createDate" label="创建日期" width="120" align="center" />
        <el-table-column prop="conclusion" label="调查结论" min-width="200" show-overflow-tooltip />
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleView(row)">查看</el-button>
            <el-button type="success" link v-if="row.status === '进行中'" @click="handleComplete(row)">完成</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-row :gutter="16" style="margin-top: 16px">
      <el-col :span="8">
        <el-card><el-statistic title="进行中" :value="inProgressCount" /></el-card>
      </el-col>
      <el-col :span="8">
        <el-card><el-statistic title="已完成" :value="completedCount" /></el-card>
      </el-col>
      <el-col :span="8">
        <el-card><el-statistic title="本月调查" :value="monthlyCount" /></el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useQualityStore } from '@/store/qualityStore'

const qualityStore = useQualityStore()

const surveyList = computed(() => qualityStore.surveyList)

const inProgressCount = computed(() => surveyList.value.filter(s => s.status === '进行中').length)
const completedCount = computed(() => surveyList.value.filter(s => s.status === '已完成').length)
const monthlyCount = computed(() => surveyList.value.length)

const getStatusType = (status) => {
  const map = { '进行中': 'warning', '已完成': 'success' }
  return map[status] || 'info'
}

const handleAdd = () => ElMessage.info('新建调查')
const handleView = (row) => ElMessage.info(`查看调查 ${row.surveyNo}`)
const handleComplete = (row) => {
  row.status = '已完成'
  row.conclusion = '调查完成，确认问题原因'
  ElMessage.success('调查已完成')
}
</script>

<style scoped lang="scss">
.page-container {
  .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5); }
  .card-header { display: flex; justify-content: space-between; align-items: center; }
}
</style>
