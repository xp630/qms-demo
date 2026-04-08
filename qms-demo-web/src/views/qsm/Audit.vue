<template>
  <div class="page-container">
    <h2 class="page-title">体系审核</h2>

    <el-card shadow="hover">
      <el-table :data="auditRecords" stripe border>
        <el-table-column prop="auditNo" label="审核编号" width="120" />
        <el-table-column prop="type" label="审核类型" width="120" />
        <el-table-column prop="dept" label="审核部门" />
        <el-table-column prop="auditor" label="审核人" width="100" />
        <el-table-column prop="auditDate" label="审核日期" width="120" />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="issues" label="问题数" width="80" align="center" />
        <el-table-column label="操作" width="150">
          <template #default>
            <el-button type="primary" link>查看报告</el-button>
            <el-button type="primary" link>整改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auditRecords } from '@/mock'

const getStatusType = (status) => {
  const map = { '已完成': 'success', '待整改': 'warning' }
  return map[status] || ''
}
</script>

<style scoped lang="scss">
.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }
</style>
