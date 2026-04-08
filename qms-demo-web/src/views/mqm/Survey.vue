<template>
  <div class="page-container">
    <h2 class="page-title">机台调查</h2>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="surveyNo" label="调查编号" />
        <el-table-column prop="machineNo" label="机台号" />
        <el-table-column prop="surveyType" label="调查类型" />
        <el-table-column prop="createDate" label="创建日期" />
        <el-table-column prop="status" label="状态"><template #default="{ row }"><el-tag :type="row.status === '已完成' ? 'success' : 'warning'">{{ row.status }}</el-tag></template></el-table-column>
        <el-table-column label="操作" width="150"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { surveyList } from '@/mock'
const tableData = ref([...surveyList])
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #303133; } }</style>
