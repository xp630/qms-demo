<template>
  <div class="page-container">
    <h2 class="page-title">检具管理</h2>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="gaugeNo" label="检具编号" />
        <el-table-column prop="name" label="检具名称" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="dept" label="使用部门" />
        <el-table-column prop="lastCheck" label="最近校验" />
        <el-table-column prop="nextCheck" label="下次校验" />
        <el-table-column prop="status" label="状态"><template #default="{ row }"><el-tag :type="row.status === '正常' ? 'success' : 'warning'">{{ row.status }}</el-tag></template></el-table-column>
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { gaugeList } from '@/mock'
const tableData = ref([...gaugeList])
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #303133; } }</style>
