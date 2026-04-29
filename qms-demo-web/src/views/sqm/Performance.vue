<template>
  <div class="page-container">
    <h2 class="page-title">绩效管理</h2>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="supplierNo" label="供应商编号" />
        <el-table-column prop="supplierName" label="供应商名称" />
        <el-table-column prop="level" label="等级" align="center"><template #default="{ row }"><el-tag :type="row.level === 'A' ? 'success' : 'warning'">{{ row.level }}</el-tag></template></el-table-column>
        <el-table-column prop="qualityScore" label="质量得分" align="center" />
        <el-table-column prop="deliveryScore" label="交付得分" align="center" />
        <el-table-column prop="totalScore" label="综合得分" align="center" />
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { performanceList } from '@/mock'
const tableData = ref([...performanceList])
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5); } }</style>
