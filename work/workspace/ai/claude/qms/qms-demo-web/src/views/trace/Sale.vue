<template>
  <div class="page-container">
    <h2 class="page-title">销售信息</h2>
    <el-card shadow="hover">
      <el-table :data="[{},{},{}]" stripe border>
        <el-table-column prop="machineNo" label="机台号" />
        <el-table-column prop="saleDate" label="销售日期" />
        <el-table-column prop="customer" label="客户" />
        <el-table-column prop="saleRegion" label="销售区域" />
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
