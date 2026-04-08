<template>
  <div class="page-container">
    <h2 class="page-title">测量计划</h2>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="planNo" label="计划编号" />
        <el-table-column prop="planDate" label="计划日期" />
        <el-table-column prop="model" label="机台型" />
        <el-table-column prop="items" label="测量项目数" align="center" />
        <el-table-column prop="status" label="状态"><template #default><el-tag>进行中</el-tag></template></el-table-column>
        <el-table-column label="操作" width="150"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { measurePlanList } from '@/mock'
const tableData = ref([...measurePlanList])
</script>

<style scoped lang="scss">
.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }
</style>
