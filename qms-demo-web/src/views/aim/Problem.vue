<template>
  <div class="page-container">
    <h2 class="page-title">问题管理</h2>
    <el-card shadow="hover">
      <el-table :data="problemList" stripe border>
        <el-table-column prop="problemNo" label="问题编号" width="130" />
        <el-table-column prop="title" label="问题标题" show-overflow-tooltip />
        <el-table-column prop="level" label="等级" width="80" align="center"><template #default="{ row }"><el-tag :type="getLevelType(row.level)">{{ row.level }}</el-tag></template></el-table-column>
        <el-table-column prop="status" label="状态" width="100" align="center"><template #default="{ row }"><el-tag>{{ row.status }}</el-tag></template></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="120" />
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { problemList } from '@/mock'
const getLevelType = (level) => ({ 'S': 'danger', 'A': 'warning', 'B': 'info', 'C': 'success' }[level] || '')
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
