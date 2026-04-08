<template>
  <div class="page-container">
    <h2 class="page-title">一致性抽查</h2>
    <el-card shadow="hover">
      <el-table :data="tableData" stripe border>
        <el-table-column prop="checkNo" label="抽查编号" />
        <el-table-column prop="productName" label="产品名称" />
        <el-table-column prop="checkDate" label="抽查日期" />
        <el-table-column prop="sampleSize" label="抽样数量" align="center" />
        <el-table-column prop="qualified" label="合格数" align="center" />
        <el-table-column prop="rate" label="合格率" align="center"><template #default="{ row }"><el-tag :type="row.result === '通过' ? 'success' : 'warning'">{{ row.rate }}</el-tag></template></el-table-column>
        <el-table-column prop="result" label="结果"><template #default="{ row }"><el-tag :type="row.result === '通过' ? 'success' : 'warning'">{{ row.result }}</el-tag></template></el-table-column>
        <el-table-column label="操作" width="120"><template #default><el-button type="primary" link>详情</el-button></template></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { spotCheckList } from '@/mock'
const tableData = ref([...spotCheckList])
</script>
<style scoped lang="scss">.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #303133; } }</style>
