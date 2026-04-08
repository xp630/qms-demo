<template>
  <div class="page-container">
    <h2 class="page-title">来料检验</h2>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="inspectNo" label="检验单号" />
        <el-table-column prop="supplierName" label="供应商" />
        <el-table-column prop="partName" label="零件名称" />
        <el-table-column prop="inspectDate" label="检验日期" />
        <el-table-column prop="quantity" label="数量" align="center" />
        <el-table-column prop="qualified" label="合格数" align="center" />
        <el-table-column prop="status" label="状态"><template #default="{ row }"><el-tag :type="row.status === '合格' ? 'success' : 'danger'">{{ row.status }}</el-tag></template></el-table-column>
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { incomingList } from '@/mock'
const tableData = ref([...incomingList])
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #303133; } }</style>
