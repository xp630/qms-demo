<template>
  <div class="page-container">
    <h2 class="page-title">APQP管理</h2>
    <el-card shadow="hover">
      <el-table :data="supplierList" stripe border>
        <el-table-column prop="supplierNo" label="供应商编号" width="100" />
        <el-table-column prop="name" label="供应商名称" />
        <el-table-column prop="level" label="等级" width="80" align="center"><template #default="{ row }"><el-tag :type="row.level === 'A' ? 'success' : 'warning'">{{ row.level }}</el-tag></template></el-table-column>
        <el-table-column prop="apqpStatus" label="APQP状态" width="100" align="center"><template #default><el-tag>进行中</el-tag></template></el-table-column>
        <el-table-column prop="score" label="绩效评分" width="100" align="center" />
        <el-table-column label="操作" width="150"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { supplierList } from '@/mock'
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
