<template>
  <div class="page-container">
    <h2 class="page-title">偏差申请</h2>
    <el-card shadow="hover">
      <el-form :model="form" label-width="120px">
        <el-form-item label="偏差编号"><el-input v-model="form.damNo" disabled /></el-form-item>
        <el-form-item label="偏差描述" required><el-input v-model="form.description" type="textarea" :rows="3" placeholder="请输入偏差描述" /></el-form-item>
        <el-form-item label="偏差原因"><el-input v-model="form.reason" type="textarea" :rows="2" placeholder="请输入偏差原因" /></el-form-item>
        <el-form-item label="影响范围"><el-input v-model="form.scope" placeholder="请输入影响范围" /></el-form-item>
        <el-form-item label="实施日期"><el-date-picker v-model="form.implementDate" type="date" placeholder="选择日期" /></el-form-item>
        <el-form-item><el-button type="primary" @click="handleSubmit">提交申请</el-button><el-button>保存草稿</el-button></el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'

const form = reactive({
  damNo: 'DA2024-001',
  description: '',
  reason: '',
  scope: '',
  implementDate: ''
})

const handleSubmit = () => ElMessage.success('提交成功')
</script>

<style scoped lang="scss">
.page-container { .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; } }
</style>
