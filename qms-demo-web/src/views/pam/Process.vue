<template>
  <div class="page-container">
    <h2 class="page-title">过程AUDIT</h2>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="auditNo" label="审核编号" />
        <el-table-column prop="dept" label="审核部门" />
        <el-table-column prop="auditDate" label="审核日期" />
        <el-table-column prop="auditor" label="审核人" />
        <el-table-column prop="status" label="状态"><template #default="{ row }"><el-tag :type="row.status === '已完成' ? 'success' : 'warning'">{{ row.status }}</el-tag></template></el-table-column>
        <el-table-column prop="issues" label="问题数" align="center" />
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>报告</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { processAuditList } from '@/mock'
const tableData = ref([...processAuditList])
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #303133; } }</style>
