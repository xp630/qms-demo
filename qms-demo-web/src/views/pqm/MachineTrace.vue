<template>
  <div class="page-container">
    <h2 class="page-title">机台追溯</h2>

    <!-- 搜索表单 -->
    <div class="search-form">
      <el-form :inline="true" :model="searchForm" class="search-form-inline">
        <el-form-item label="计划号">
          <el-input v-model="searchForm.planNo" placeholder="请输入计划号" clearable />
        </el-form-item>
        <el-form-item label="机台号">
          <el-input v-model="searchForm.machineNo" placeholder="请输入机台号" clearable />
        </el-form-item>
        <el-form-item label="机台型">
          <el-select v-model="searchForm.model" placeholder="全部" clearable style="width: 150px">
            <el-option label="类型A" value="类型A" />
            <el-option label="类型B" value="类型B" />
            <el-option label="类型C" value="类型C" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="全部" clearable style="width: 120px">
            <el-option label="正常" value="正常" />
            <el-option label="异常" value="异常" />
            <el-option label="维护中" value="维护中" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon> 查询
          </el-button>
          <el-button @click="handleReset">
            <el-icon><Refresh /></el-icon> 重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 操作按钮 -->
    <div class="table-toolbar">
      <el-button type="primary" @click="handleExport">
        <el-icon><Download /></el-icon> 导出
      </el-button>
      <el-button type="success" @click="handleRefresh">
        <el-icon><Refresh /></el-icon> 刷新
      </el-button>
    </div>

    <!-- 机台列表 -->
    <el-table :data="machineList" stripe border v-loading="loading">
      <el-table-column prop="machineNo" label="机台流水号" width="130" fixed />
      <el-table-column prop="planNo" label="计划号" width="130" />
      <el-table-column prop="model" label="机台型" width="100" />
      <el-table-column prop="totalCount" label="生产总数" width="100" align="right">
        <template #default="{ row }">{{ row.totalCount.toLocaleString() }}</template>
      </el-table-column>
      <el-table-column prop="fpyRate" label="FPY(%)" width="90" align="center">
        <template #default="{ row }">
          <el-tag :type="row.fpyRate >= 98 ? 'success' : row.fpyRate >= 97 ? 'warning' : 'danger'" effect="dark">
            {{ row.fpyRate }}%
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="configCode" label="配置代码" width="110" />
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="120" />
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleView(row)">查看详情</el-button>
          <el-button type="primary" link @click="handleTrace(row)">追溯</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 机台详情弹窗 -->
    <el-dialog v-model="detailVisible" title="机台履历详情" width="900px" destroy-on-close>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="机台流水号">{{ currentMachine?.machineNo }}</el-descriptions-item>
        <el-descriptions-item label="计划号">{{ currentMachine?.planNo }}</el-descriptions-item>
        <el-descriptions-item label="机台型">{{ currentMachine?.model }}</el-descriptions-item>
        <el-descriptions-item label="配置代码">{{ currentMachine?.configCode }}</el-descriptions-item>
        <el-descriptions-item label="生产总数">{{ currentMachine?.totalCount?.toLocaleString() }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(currentMachine?.status)">{{ currentMachine?.status }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ currentMachine?.createTime }}</el-descriptions-item>
      </el-descriptions>

      <el-tabs class="detail-tabs" v-if="currentMachine">
        <el-tab-pane label="配置信息" name="config">
          <el-table :data="configData" border size="small">
            <el-table-column prop="item" label="配置项" />
            <el-table-column prop="value" label="配置值" />
            <el-table-column prop="updateTime" label="更新时间" width="120" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="生产数据" name="production">
          <el-table :data="productionData" border size="small">
            <el-table-column prop="date" label="日期" width="100" />
            <el-table-column prop="output" label="产量" width="80" align="right" />
            <el-table-column prop="okCount" label="合格数" width="80" align="right" />
            <el-table-column prop="ngCount" label="不合格数" width="90" align="right" />
            <el-table-column prop="fpyRate" label="FPY(%)" width="80" align="center" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="关键件" name="component">
          <el-table :data="componentData" border size="small">
            <el-table-column prop="partNo" label="零件号" width="120" />
            <el-table-column prop="partName" label="零件名称" />
            <el-table-column prop="serialNo" label="序列号" width="150" />
            <el-table-column prop="supplier" label="供应商" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Refresh, Download } from '@element-plus/icons-vue'
import { machineList as mockMachineList } from '@/mock'

const loading = ref(false)
const searchForm = reactive({
  planNo: '',
  machineNo: '',
  model: '',
  status: ''
})

const machineList = ref([...mockMachineList])
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: mockMachineList.length
})

const detailVisible = ref(false)
const currentMachine = ref(null)

const configData = ref([
  { item: '处理器', value: 'Intel i7-12700K', updateTime: '2024-01-15' },
  { item: '内存', value: '32GB DDR5', updateTime: '2024-01-15' },
  { item: '硬盘', value: '1TB NVMe SSD', updateTime: '2024-01-15' }
])

const productionData = ref([
  { date: '2024-04-01', output: 120, okCount: 118, ngCount: 2, fpyRate: 98.3 },
  { date: '2024-04-02', output: 115, okCount: 113, ngCount: 2, fpyRate: 98.3 },
  { date: '2024-04-03', output: 130, okCount: 128, ngCount: 2, fpyRate: 98.5 }
])

const componentData = ref([
  { partNo: 'P-001', partName: 'ECU模块', serialNo: 'ECU20240315001', supplier: '供应商A' },
  { partNo: 'P-002', partName: '电池包', serialNo: 'BAT20240315002', supplier: '供应商B' },
  { partNo: 'P-003', partName: '扭矩传感器', serialNo: 'TS20240315003', supplier: '供应商C' }
])

const getStatusType = (status) => {
  const map = { '正常': 'success', '异常': 'danger', '维护中': 'warning' }
  return map[status] || ''
}

const handleSearch = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    ElMessage.success('查询成功')
  }, 500)
}

const handleReset = () => {
  Object.assign(searchForm, { planNo: '', machineNo: '', model: '', status: '' })
  handleSearch()
}

const handleExport = () => {
  ElMessage.success('导出成功')
}

const handleRefresh = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    ElMessage.success('刷新成功')
  }, 500)
}

const handleView = (row) => {
  currentMachine.value = row
  detailVisible.value = true
}

const handleTrace = (row) => {
  ElMessage.info('跳转至追溯页面')
}

const handleSizeChange = (val) => {
  pagination.pageSize = val
}

const handlePageChange = (val) => {
  pagination.page = val
}

onMounted(() => {
  // 初始化
})
</script>

<style scoped lang="scss">
.page-container {
  .page-title {
    margin: 0 0 20px 0;
    font-size: 20px;
    font-weight: 600;
    color: #303133;
  }

  .search-form {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 16px;

    .search-form-inline {
      :deep(.el-form-item) {
        margin-bottom: 0;
      }
    }
  }

  .table-toolbar {
    margin-bottom: 16px;
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .detail-tabs {
    margin-top: 20px;
  }
}
</style>
