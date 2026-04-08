<template>
  <div class="page-container">
    <h2 class="page-title">问题检索</h2>
    <el-card shadow="hover">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="关键词"><el-input v-model="searchForm.keyword" placeholder="输入关键词" clearable /></el-form-item>
        <el-form-item><el-button type="primary">查询</el-button></el-form-item>
      </el-form>
      <el-table :data="tableData" stripe border style="margin-top:20px;">
        <el-table-column prop="problemNo" label="问题编号" />
        <el-table-column prop="title" label="问题标题" show-overflow-tooltip />
        <el-table-column prop="level" label="等级"><template #default="{ row }"><el-tag type="warning">{{ row.level }}</el-tag></template></el-table-column>
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="createDate" label="创建日期" />
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { aimSearchResult } from '@/mock'
const searchForm = reactive({ keyword: '', type: '' })
const tableData = ref([...aimSearchResult])
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #303133; } }</style>
