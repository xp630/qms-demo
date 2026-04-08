<template>
  <div class="page-container">
    <h2 class="page-title">PPM计算</h2>
    <el-card shadow="hover">
      <el-table :data="[{},{},{}]" stripe border>
        <el-table-column prop="supplier" label="供应商" />
        <el-table-column prop="partNo" label="零件号" />
        <el-table-column prop="receiveQty" label="来料数量" align="center" />
        <el-table-column prop="defectQty" label="不良数" align="center" />
        <el-table-column prop="ppm" label="PPM" align="center"><template #default><el-tag type="success">125</el-tag></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
