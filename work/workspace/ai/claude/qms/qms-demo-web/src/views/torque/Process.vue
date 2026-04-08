<template>
  <div class="page-container">
    <h2 class="page-title">扭矩数据处理</h2>
    <el-card shadow="hover">
      <el-table :data="[{},{},{}]" stripe border>
        <el-table-column prop="machineNo" label="机台号" />
        <el-table-column prop="torqueValue" label="扭矩值(Nm)" align="center" />
        <el-table-column prop="targetValue" label="目标值(Nm)" align="center" />
        <el-table-column prop="deviation" label="偏差%" align="center" />
        <el-table-column prop="result" label="结果"><template #default><el-tag type="success">合格</el-tag></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
