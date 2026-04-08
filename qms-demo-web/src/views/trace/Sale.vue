<template>
  <div class="page-container">
    <h2 class="page-title">销售信息</h2>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="saleNo" label="销售单号" />
        <el-table-column prop="machineNo" label="机台号" />
        <el-table-column prop="customerName" label="客户名称" />
        <el-table-column prop="saleDate" label="销售日期" />
        <el-table-column prop="quantity" label="数量" align="center" />
        <el-table-column prop="amount" label="金额(元)" align="right"><template #default="{ row }">¥{{ row.amount.toLocaleString() }}</template></el-table-column>
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { saleInfoList } from '@/mock'
const tableData = ref([...saleInfoList])
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #303133; } }</style>
