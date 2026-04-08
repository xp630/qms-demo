<template>
  <div class="page-container">
    <h2 class="page-title">试验委托</h2>
    <el-card shadow="hover">
      <el-table :data="[{},{},{}]" stripe border>
        <el-table-column prop="testNo" label="委托编号" />
        <el-table-column prop="partNo" label="零件号" />
        <el-table-column prop="testType" label="试验类型" />
        <el-table-column prop="applicant" label="申请人" />
        <el-table-column prop="status" label="状态"><template #default><el-tag>待受理</el-tag></template></el-table-column>
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
