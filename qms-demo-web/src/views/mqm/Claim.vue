<template>
  <div class="page-container">
    <h2 class="page-title">问题索赔</h2>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="claimNo" label="索赔单号" />
        <el-table-column prop="machineNo" label="机台号" />
        <el-table-column prop="claimType" label="索赔类型" />
        <el-table-column prop="amount" label="索赔金额" align="right"><template #default="{ row }">¥{{ row.amount.toLocaleString() }}</template></el-table-column>
        <el-table-column prop="status" label="状态"><template #default="{ row }"><el-tag :type="row.status === '已结案' ? 'success' : 'warning'">{{ row.status }}</el-tag></template></el-table-column>
        <el-table-column label="操作" width="150"><template #default><el-button type="primary" link>处理</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { claimList } from '@/mock'
const tableData = ref([...claimList])
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #303133; } }</style>
