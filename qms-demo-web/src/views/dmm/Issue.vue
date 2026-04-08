<template>
  <div class="page-container">
    <h2 class="page-title">尺寸问题</h2>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="issueNo" label="问题编号" />
        <el-table-column prop="partNo" label="零件号" />
        <el-table-column prop="dimension" label="测量维度" />
        <el-table-column prop="deviation" label="偏差值" />
        <el-table-column prop="severity" label="严重度"><template #default><el-tag type="warning">高</el-tag></template></el-table-column>
        <el-table-column label="操作" width="150"><template #default><el-button type="primary" link>整改</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { measureIssueList } from '@/mock'
const tableData = ref([...measureIssueList])
</script>

<style scoped lang="scss">
.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }
</style>
