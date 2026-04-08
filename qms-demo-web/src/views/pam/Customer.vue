<template>
  <div class="page-container">
    <h2 class="page-title">顾客评审</h2>
    <el-card shadow="hover">
      <el-table :data="[{},{},{}]" stripe border>
        <el-table-column prop="auditNo" label="评审编号" />
        <el-table-column prop="customer" label="客户" />
        <el-table-column prop="auditDate" label="评审日期" />
        <el-table-column prop="score" label="评分" align="center" />
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
