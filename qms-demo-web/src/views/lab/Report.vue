<template>
  <div class="page-container">
    <h2 class="page-title">报告管理</h2>
    <el-card shadow="hover">
      <el-table :data="[{},{},{}]" stripe border>
        <el-table-column prop="reportNo" label="报告编号" />
        <el-table-column prop="testNo" label="委托编号" />
        <el-table-column prop="result" label="试验结果"><template #default><el-tag type="success">合格</el-tag></template></el-table-column>
        <el-table-column prop="reportDate" label="报告日期" />
        <el-table-column label="操作" width="150"><template #default><el-button type="primary" link>查看</el-button><el-button type="primary" link>下载</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
