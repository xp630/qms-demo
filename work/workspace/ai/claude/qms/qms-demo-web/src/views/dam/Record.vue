<template>
  <div class="page-container">
    <h2 class="page-title">偏差记录</h2>
    <el-card shadow="hover">
      <el-table :data="[{},{},{}]" stripe border>
        <el-table-column prop="damNo" label="偏差编号" />
        <el-table-column prop="description" label="偏差描述" show-overflow-tooltip />
        <el-table-column prop="status" label="状态"><template #default><el-tag type="success">已关闭</el-tag></template></el-table-column>
        <el-table-column prop="createDate" label="创建日期" />
        <el-table-column prop="closeDate" label="关闭日期" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }
</style>
