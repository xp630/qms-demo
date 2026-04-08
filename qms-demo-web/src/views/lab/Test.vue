<template>
  <div class="page-container">
    <h2 class="page-title">试验委托</h2>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="testNo" label="委托编号" />
        <el-table-column prop="productName" label="产品名称" />
        <el-table-column prop="testType" label="试验类型" />
        <el-table-column prop="applicant" label="申请人" />
        <el-table-column prop="applyDate" label="申请日期" />
        <el-table-column prop="status" label="状态"><template #default="{ row }"><el-tag :type="row.status === '进行中' ? 'success' : 'info'">{{ row.status }}</el-tag></template></el-table-column>
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { testList } from '@/mock'
const tableData = ref([...testList])
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #303133; } }</style>
