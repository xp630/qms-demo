<template>
  <div class="page-container">
    <h2 class="page-title">一致性抽查</h2>
    <el-card shadow="hover">
      <el-table :data="[{},{},{}]" stripe border>
        <el-table-column prop="checkNo" label="抽查编号" />
        <el-table-column prop="checkDate" label="抽查日期" />
        <el-table-column prop="model" label="机台型" />
        <el-table-column prop="sampleSize" label="抽样数量" align="center" />
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
