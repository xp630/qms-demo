<template>
  <div class="page-container">
    <h2 class="page-title">电池管理</h2>
    <el-card shadow="hover">
      <el-table :data="[{},{},{}]" stripe border>
        <el-table-column prop="machineNo" label="机台号" />
        <el-table-column prop="batteryCode" label="电池包编码" />
        <el-table-column prop="moduleCount" label="模组数量" align="center" />
        <el-table-column prop="cellCount" label="单体数量" align="center" />
        <el-table-column prop="status" label="状态"><template #default><el-tag type="success">正常</el-tag></template></el-table-column>
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
