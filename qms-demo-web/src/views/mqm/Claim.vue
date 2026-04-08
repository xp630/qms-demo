<template>
  <div class="page-container">
    <h2 class="page-title">问题索赔</h2>
    <el-card shadow="hover">
      <el-table :data="[{},{},{}]" stripe border>
        <el-table-column prop="claimNo" label="索赔单号" />
        <el-table-column prop="orderNo" label="工单号" />
        <el-table-column prop="supplier" label="供应商" />
        <el-table-column prop="amount" label="索赔金额" align="right" />
        <el-table-column prop="status" label="状态"><template #default><el-tag type="warning">处理中</el-tag></template></el-table-column>
        <el-table-column label="操作" width="150"><template #default><el-button type="primary" link>处理</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
