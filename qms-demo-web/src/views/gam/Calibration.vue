<template>
  <div class="page-container">
    <h2 class="page-title">校准计划</h2>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="calibNo" label="校准编号" />
        <el-table-column prop="equipNo" label="设备编号" />
        <el-table-column prop="equipName" label="设备名称" />
        <el-table-column prop="calibrationDate" label="校准日期" />
        <el-table-column prop="nextDate" label="下次校准" />
        <el-table-column prop="status" label="状态"><template #default="{ row }"><el-tag :type="row.status === '正常' ? 'success' : 'warning'">{{ row.status }}</el-tag></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { calibrationList } from '@/mock'
const tableData = ref([...calibrationList])
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #303133; } }</style>
