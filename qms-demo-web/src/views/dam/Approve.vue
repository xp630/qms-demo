<template>
  <div class="page-container">
    <h2 class="page-title">偏差审批</h2>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="damNo" label="偏差编号" />
        <el-table-column prop="description" label="偏差描述" show-overflow-tooltip />
        <el-table-column prop="applicant" label="申请人" />
        <el-table-column prop="applyDate" label="申请日期" />
        <el-table-column prop="status" label="状态">
          <template #default><el-tag type="warning">待审批</el-tag></template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default>
            <el-button type="primary" link>查看</el-button>
            <el-button type="success" link>批准</el-button>
            <el-button type="danger" link>驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { damApproveList } from '@/mock'
const tableData = ref([...damApproveList])
</script>

<style scoped lang="scss">
.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }
</style>
