<template>
  <div class="page-container">
    <h2 class="page-title">问题索赔</h2>

    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>索赔列表 ({{ claimList.length }})</span>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon> 新建索赔
          </el-button>
        </div>
      </template>

      <el-table :data="claimList" stripe border>
        <el-table-column prop="claimNo" label="索赔单号" width="130" fixed />
        <el-table-column prop="machineNo" label="机台号" width="120" />
        <el-table-column prop="customer" label="客户" width="100" align="center" />
        <el-table-column prop="claimType" label="索赔类型" width="120" align="center" />
        <el-table-column prop="amount" label="索赔金额(元)" width="120" align="right">
          <template #default="{ row }">
            {{ row.amount.toLocaleString() }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="claimDate" label="索赔日期" width="120" align="center" />
        <el-table-column prop="description" label="描述" min-width="200" show-overflow-tooltip />
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleView(row)">查看</el-button>
            <el-button type="success" link v-if="row.status === '待处理'" @click="handleProcess(row)">处理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-row :gutter="16" style="margin-top: 16px">
      <el-col :span="8">
        <el-card><el-statistic title="待处理索赔" :value="pendingAmount" prefix="¥" /></el-card>
      </el-col>
      <el-col :span="8">
        <el-card><el-statistic title="处理中索赔" :value="processingAmount" prefix="¥" /></el-card>
      </el-col>
      <el-col :span="8">
        <el-card><el-statistic title="已结案索赔" :value="closedAmount" prefix="¥" /></el-card>
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

const claimList = computed(() => qualityStore.claimList)

const pendingAmount = computed(() =>
  claimList.value.filter(c => c.status === '待处理').reduce((sum, c) => sum + c.amount, 0)
)
const processingAmount = computed(() =>
  claimList.value.filter(c => c.status === '处理中').reduce((sum, c) => sum + c.amount, 0)
)
const closedAmount = computed(() =>
  claimList.value.filter(c => c.status === '已结案').reduce((sum, c) => sum + c.amount, 0)
)

const getStatusType = (status) => {
  const map = { '待处理': 'warning', '处理中': 'primary', '已结案': 'success' }
  return map[status] || 'info'
}

const handleAdd = () => ElMessage.info('新建索赔')
const handleView = (row) => ElMessage.info(`查看索赔 ${row.claimNo}`)
const handleProcess = (row) => {
  row.status = '处理中'
  ElMessage.success('开始处理')
}
</script>

<style scoped lang="scss">
.page-container {
  .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5); }
  .card-header { display: flex; justify-content: space-between; align-items: center; }
}
</style>
