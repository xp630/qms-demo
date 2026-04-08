<template>
  <div class="page-container">
    <h2 class="page-title">校准计划</h2>
    <el-card shadow="hover">
      <el-table :data="[{},{},{}]" stripe border>
        <el-table-column prop="planNo" label="计划编号" />
        <el-table-column prop="equipName" label="设备名称" />
        <el-table-column prop="planDate" label="计划日期" />
        <el-table-column prop="type" label="校准类型" />
        <el-table-column prop="status" label="状态"><template #default><el-tag>待执行</el-tag></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
