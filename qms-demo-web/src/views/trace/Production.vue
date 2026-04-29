<template>
  <div class="page-container">
    <h2 class="page-title">生产信息</h2>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="machineNo" label="机台号" />
        <el-table-column prop="productName" label="产品名称" />
        <el-table-column prop="output" label="产量" align="center" />
        <el-table-column prop="qualified" label="合格数" align="center" />
        <el-table-column prop="fpy" label="FPY(%)" align="center"><template #default="{ row }"><el-tag type="success">{{ row.fpy }}%</el-tag></template></el-table-column>
        <el-table-column prop="productionDate" label="生产日期" />
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { productionInfoList } from '@/mock'
const tableData = ref([...productionInfoList])
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5); } }</style>
