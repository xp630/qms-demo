<template>
  <div class="page-container">
    <h2 class="page-title">检具管理</h2>
    <el-card shadow="hover">
      <el-table :data="[{},{},{}]" stripe border>
        <el-table-column prop="gaugeNo" label="检具编号" />
        <el-table-column prop="name" label="检具名称" />
        <el-table-column prop="model" label="型号" />
        <el-table-column prop="nextDate" label="下次校验" />
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
