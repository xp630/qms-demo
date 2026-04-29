<template>
  <div class="page-container">
    <h2 class="page-title">PPAP管理</h2>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="ppapNo" label="PPAP编号" />
        <el-table-column prop="supplierName" label="供应商" />
        <el-table-column prop="partName" label="零件名称" />
        <el-table-column prop="level" label="提交级别" />
        <el-table-column prop="submitDate" label="提交日期" />
        <el-table-column prop="status" label="状态"><template #default="{ row }"><el-tag :type="row.status === '已批准' ? 'success' : row.status === '待审批' ? 'warning' : 'info'">{{ row.status }}</el-tag></template></el-table-column>
        <el-table-column label="操作" width="150"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { ppapList } from '@/mock'
const tableData = ref([...ppapList])
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5); } }</style>
