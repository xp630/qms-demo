<template>
  <div class="page-container">
    <h2 class="page-title">关键件追溯</h2>

    <el-card shadow="hover" class="search-card">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="计划号">
          <el-input v-model="searchForm.planNo" placeholder="请输入计划号" clearable />
        </el-form-item>
        <el-form-item label="零件号">
          <el-input v-model="searchForm.partNo" placeholder="请输入零件号" clearable />
        </el-form-item>
        <el-form-item label="序列号">
          <el-input v-model="searchForm.serialNo" placeholder="请输入序列号" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon> 查询
          </el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="hover">
      <el-table :data="componentList" stripe border>
        <el-table-column prop="planNo" label="计划号" width="130" />
        <el-table-column prop="machineNo" label="机台号" width="130" />
        <el-table-column prop="partNo" label="零件号" width="120" />
        <el-table-column prop="partName" label="零件名称" />
        <el-table-column prop="serialNo" label="序列号" width="180" />
        <el-table-column prop="supplier" label="供应商" width="120" />
        <el-table-column prop="installTime" label="装配时间" width="160" />
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleTrace">追溯</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const searchForm = reactive({
  planNo: '',
  partNo: '',
  serialNo: ''
})

const componentList = ref([
  { id: 1, planNo: 'P2024-01', machineNo: 'M20240001', partNo: 'P-001', partName: 'ECU模块', serialNo: 'ECU20240315001', supplier: '供应商A', installTime: '2024-03-15 10:30' },
  { id: 2, planNo: 'P2024-01', machineNo: 'M20240001', partNo: 'P-002', partName: '电池包', serialNo: 'BAT20240315002', supplier: '供应商B', installTime: '2024-03-15 10:35' },
  { id: 3, planNo: 'P2024-01', machineNo: 'M20240002', partNo: 'P-001', partName: 'ECU模块', serialNo: 'ECU20240316001', supplier: '供应商A', installTime: '2024-03-16 09:00' },
  { id: 4, planNo: 'P2024-02', machineNo: 'M20240003', partNo: 'P-003', partName: '扭矩传感器', serialNo: 'TS2024032001', supplier: '供应商C', installTime: '2024-03-20 14:20' },
  { id: 5, planNo: 'P2024-02', machineNo: 'M20240004', partNo: 'P-002', partName: '电池包', serialNo: 'BAT2024032101', supplier: '供应商B', installTime: '2024-03-21 11:15' }
])

const handleSearch = () => {
  ElMessage.success('查询成功')
}

const handleReset = () => {
  Object.assign(searchForm, { planNo: '', partNo: '', serialNo: '' })
}

const handleTrace = () => {
  ElMessage.info('追溯详情')
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
  .search-card {
    margin-bottom: 16px;
  }
}
</style>
