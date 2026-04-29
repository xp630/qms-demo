<template>
  <div class="page-container">
    <h2 class="page-title">PPM计算</h2>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="month" label="月份" />
        <el-table-column prop="supplierName" label="供应商" />
        <el-table-column prop="totalQuantity" label="来料总数" align="center" />
        <el-table-column prop="defectQuantity" label="不良数" align="center" />
        <el-table-column prop="ppm" label="PPM" align="center"><template #default="{ row }"><el-tag type="success">{{ row.ppm.toLocaleString() }}</el-tag></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { ppmData } from '@/mock'
const tableData = ref([...ppmData])
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5); } }</style>
