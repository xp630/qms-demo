<template>
  <div class="page-container">
    <h2 class="page-title">问题检索</h2>
    <el-card shadow="hover">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="关键词"><el-input v-model="searchForm.keyword" placeholder="输入关键词" clearable /></el-form-item>
        <el-form-item label="类型"><el-select v-model="searchForm.type" placeholder="全部" clearable><el-option label="实物问题" value="实物问题" /><el-option label="虚拟问题" value="虚拟问题" /></el-select></el-form-item>
        <el-form-item><el-button type="primary">查询</el-button></el-form-item>
      </el-form>
      <el-table :data="[{},{},{}]" stripe border style="margin-top:20px;">
        <el-table-column prop="problemNo" label="问题编号" />
        <el-table-column prop="title" label="问题标题" show-overflow-tooltip />
        <el-table-column prop="type" label="类型" />
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
const searchForm = reactive({ keyword: '', type: '' })
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
