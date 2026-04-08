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

    <el-card shadow="hover">
      <el-table :data="defectList" stripe border>
        <el-table-column prop="defectNo" label="缺陷编号" width="130" />
        <el-table-column prop="machineNo" label="机台号" width="130" />
        <el-table-column prop="defectType" label="缺陷类型" width="120" />
        <el-table-column prop="count" label="发生次数" width="100" align="center" />
        <el-table-column prop="severity" label="严重度" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getSeverityType(row.severity)">{{ row.severity }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="findTime" label="发现时间" width="160" />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default>
            <el-button type="primary" link>详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { defectList as mockDefectList } from '@/mock'

const searchForm = reactive({
  defectNo: '',
  machineNo: '',
  defectType: ''
})

const defectList = ref([...mockDefectList])

const getSeverityType = (severity) => {
  const map = { '高': 'danger', '中': 'warning', '低': 'info' }
  return map[severity] || ''
}

const getStatusType = (status) => {
  const map = { '已返修': 'success', '处理中': 'warning', '待分析': 'info' }
  return map[status] || ''
}

const handleSearch = () => {}
const handleReset = () => {}
</script>

<style scoped lang="scss">
.page-container {
  .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; }
  .search-card { margin-bottom: 16px; }
}
</style>
