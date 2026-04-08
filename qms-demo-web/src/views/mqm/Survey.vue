<template>
  <div class="page-container">
    <h2 class="page-title">机台调查</h2>
    <el-card shadow="hover">
      <el-table :data="[{},{},{}]" stripe border>
        <el-table-column prop="surveyNo" label="调查编号" />
        <el-table-column prop="machineNo" label="机台号" />
        <el-table-column prop="issue" label="问题描述" show-overflow-tooltip />
        <el-table-column prop="status" label="状态"><template #default><el-tag>调查中</el-tag></template></el-table-column>
        <el-table-column label="操作" width="150"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
