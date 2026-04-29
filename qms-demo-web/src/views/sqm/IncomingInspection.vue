<template>
  <div class="page-container">
    <h2 class="page-title">来料检验管理</h2>

    <!-- 搜索 -->
    <el-card style="margin-bottom: 16px">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="供应商">
          <el-select v-model="searchForm.supplierName" placeholder="请选择" clearable style="width: 180px">
            <el-option v-for="s in supplierList" :key="s" :label="s" :value="s" />
          </el-select>
        </el-form-item>
        <el-form-item label="检验日期">
          <el-date-picker v-model="searchForm.dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择" clearable style="width: 120px">
            <el-option label="合格" value="合格" />
            <el-option label="待处理" value="待处理" />
            <el-option label="不合格" value="不合格" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon> 查询
          </el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <template #header>
        <div class="card-header">
          <span>来料检验列表 ({{ filteredList.length }})</span>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon> 新建检验
          </el-button>
        </div>
      </template>

      <el-table :data="filteredList" stripe border v-loading="loading">
        <el-table-column prop="inspectNo" label="检验单号" width="130" fixed />
        <el-table-column prop="supplierName" label="供应商" min-width="150" />
        <el-table-column prop="partName" label="零件名称" min-width="150" />
        <el-table-column prop="inspectDate" label="检验日期" width="120" align="center" />
        <el-table-column prop="quantity" label="来料数量" width="100" align="right" />
        <el-table-column prop="qualified" label="合格数量" width="100" align="right">
          <template #default="{ row }">
            <span style="color: #67C23A">{{ row.qualified }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="unqualified" label="不合格数量" width="110" align="right">
          <template #default="{ row }">
            <span style="color: #F56C6C">{{ row.unqualified }}</span>
          </template>
        </el-table-column>
        <el-table-column label="合格率" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getQualifyRateType(row)" size="small">
              {{ ((row.qualified / row.quantity) * 100).toFixed(1) }}%
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="150" show-overflow-tooltip />
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleView(row)">查看</el-button>
            <el-button type="warning" link v-if="row.status === '待处理'" @click="handleProcess(row)">处理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 统计卡片 -->
    <el-row :gutter="16" style="margin-top: 16px">
      <el-col :span="6">
        <el-card>
          <el-statistic title="本周检验批次" :value="weeklyStats.totalBatches" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <el-statistic title="合格批次" :value="weeklyStats.qualifiedBatches">
            <template #suffix>
              <span style="font-size: 14px"> / {{ weeklyStats.totalBatches }}</span>
            </template>
          </el-statistic>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <el-statistic title="来料合格率" :value="weeklyStats.qualifyRate" suffix="%" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <el-statistic title="不合格批次" :value="weeklyStats.unqualifiedBatches" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Plus } from '@element-plus/icons-vue'
import { useQualityStore } from '@/store/qualityStore'

const qualityStore = useQualityStore()

const loading = ref(false)
const dialogVisible = ref(false)

const searchForm = reactive({
  supplierName: '',
  dateRange: [],
  status: ''
})

const supplierList = computed(() =>
  [...new Set(qualityStore.incomingInspectionList.map(i => i.supplierName))]
)

const filteredList = computed(() => {
  let list = qualityStore.incomingInspectionList
  if (searchForm.supplierName) {
    list = list.filter(i => i.supplierName === searchForm.supplierName)
  }
  if (searchForm.status) {
    list = list.filter(i => i.status === searchForm.status)
  }
  return list
})

const weeklyStats = reactive({
  totalBatches: 15,
  qualifiedBatches: 13,
  qualifyRate: 86.7,
  unqualifiedBatches: 2
})

const getStatusType = (status) => {
  const map = { '合格': 'success', '待处理': 'warning', '不合格': 'danger' }
  return map[status] || 'info'
}

const getQualifyRateType = (row) => {
  const rate = (row.qualified / row.quantity) * 100
  if (rate >= 98) return 'success'
  if (rate >= 95) return 'warning'
  return 'danger'
}

const handleSearch = () => {
  loading.value = true
  setTimeout(() => { loading.value = false }, 300)
}

const handleReset = () => {
  Object.assign(searchForm, { supplierName: '', dateRange: [], status: '' })
}

const handleAdd = () => {
  ElMessage.info('新建来料检验')
}

const handleView = (row) => {
  ElMessage.info('查看检验详情')
}

const handleProcess = (row) => {
  row.status = '合格'
  ElMessage.success('处理完成')
}
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
