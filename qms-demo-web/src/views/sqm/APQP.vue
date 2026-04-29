<template>
  <div class="page-container">
    <h2 class="page-title">APQP管理</h2>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="apqpNo" label="APQP编号" width="130" />
        <el-table-column prop="supplierName" label="供应商" />
        <el-table-column prop="productName" label="产品名称" />
        <el-table-column prop="phase" label="当前阶段" />
        <el-table-column prop="progress" label="进度(%)" align="center"><template #default="{ row }"><el-progress :percentage="row.progress" /></template></el-table-column>
        <el-table-column prop="status" label="状态"><template #default="{ row }"><el-tag :type="row.status === '进行中' ? 'success' : 'info'">{{ row.status }}</el-tag></template></el-table-column>
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { apqpList } from '@/mock'
const tableData = ref([...apqpList])
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5); } }</style>
