<template>
  <div class="page-container">
    <h2 class="page-title">绩效管理</h2>
    <el-card shadow="hover">
      <el-table :data="supplierList" stripe border>
        <el-table-column prop="supplierNo" label="供应商编号" />
        <el-table-column prop="name" label="供应商名称" />
        <el-table-column prop="level" label="等级" align="center"><template #default><el-tag type="success">A</el-tag></template></el-table-column>
        <el-table-column prop="score" label="绩效得分" align="center" />
        <el-table-column prop="qualityScore" label="质量得分" align="center" />
        <el-table-column prop="deliveryScore" label="交付得分" align="center" />
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { supplierList } from '@/mock'
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
