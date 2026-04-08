<template>
  <div class="page-container">
    <h2 class="page-title">来料检验</h2>
    <el-card shadow="hover">
      <el-table :data="[{},{},{}]" stripe border>
        <el-table-column prop="inspectNo" label="检验单号" />
        <el-table-column prop="supplier" label="供应商" />
        <el-table-column prop="partNo" label="零件号" />
        <el-table-column prop="quantity" label="数量" align="center" />
        <el-table-column prop="result" label="结果"><template #default><el-tag type="success">合格</el-tag></template></el-table-column>
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }</style>
