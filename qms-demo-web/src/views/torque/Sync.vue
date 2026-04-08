<template>
  <div class="page-container">
    <h2 class="page-title">扭矩数据同步</h2>
    <el-card shadow="hover">
      <el-table :data="[{},{},{}]" stripe border>
        <el-table-column prop="syncTime" label="同步时间" />
        <el-table-column prop="machineNo" label="机台号" />
        <el-table-column prop="dataCount" label="数据条数" align="center" />
        <el-table-column prop="status" label="状态"><template #default><el-tag type="success">成功</el-tag></template></el-table-column>
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
