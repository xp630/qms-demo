<template>
  <div class="page-container">
    <h2 class="page-title">电池管理</h2>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="batteryNo" label="电池编号" />
        <el-table-column prop="machineNo" label="机台号" />
        <el-table-column prop="voltage" label="电压(V)" align="center" />
        <el-table-column prop="capacity" label="容量(Ah)" align="center" />
        <el-table-column prop="status" label="状态"><template #default="{ row }"><el-tag type="success">{{ row.status }}</el-tag></template></el-table-column>
        <el-table-column prop="productionDate" label="生产日期" />
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { batteryList } from '@/mock'
const tableData = ref([...batteryList])
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5); } }</style>
