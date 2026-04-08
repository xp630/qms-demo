<template>
  <div class="page-container">
    <h2 class="page-title">测量数据</h2>
    <el-card shadow="hover">
      <el-table :data="[{},{},{}]" stripe border>
        <el-table-column prop="measureNo" label="测量编号" />
        <el-table-column prop="partNo" label="零件号" />
        <el-table-column prop="pointCount" label="测量点数" align="center" />
        <el-table-column prop="qualified" label="合格数" align="center" />
        <el-table-column prop="rate" label="合格率" align="center"><template #default><el-tag type="success">98.5%</el-tag></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }
</style>
