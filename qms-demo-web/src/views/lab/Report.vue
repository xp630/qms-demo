<template>
  <div class="page-container">
    <h2 class="page-title">报告管理</h2>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="reportNo" label="报告编号" />
        <el-table-column prop="testNo" label="委托编号" />
        <el-table-column prop="conclusion" label="试验结论"><template #default="{ row }"><el-tag :type="row.conclusion === '合格' ? 'success' : 'danger'">{{ row.conclusion }}</el-tag></template></el-table-column>
        <el-table-column prop="reportDate" label="报告日期" />
        <el-table-column prop="auditor" label="审核人" />
        <el-table-column label="操作" width="150"><template #default><el-button type="primary" link>查看</el-button><el-button type="primary" link>下载</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { labReportList } from '@/mock'
const tableData = ref([...labReportList])
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5); } }</style>
