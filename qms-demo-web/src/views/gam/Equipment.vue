<template>
  <div class="page-container">
    <h2 class="page-title">计量设备</h2>
    <el-card shadow="hover">
      <el-table :data="equipmentList" stripe border>
        <el-table-column prop="equipNo" label="设备编号" width="100" />
        <el-table-column prop="name" label="设备名称" />
        <el-table-column prop="model" label="型号" />
        <el-table-column prop="dept" label="使用部门" />
        <el-table-column prop="calibrationDate" label="校准日期" width="120" />
        <el-table-column prop="nextDate" label="下次校准" width="120" />
        <el-table-column prop="status" label="状态" width="80" align="center">
          <template #default="{ row }"><el-tag :type="row.status === '正常' ? 'success' : 'warning'">{{ row.status }}</el-tag></template>
        </el-table-column>
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { equipmentList } from '@/mock'
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
