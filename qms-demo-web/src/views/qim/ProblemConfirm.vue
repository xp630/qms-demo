<template>
  <div class="page-container">
    <h2 class="page-title">问题确认与分发</h2>

    <!-- 待分发问题列表 -->
    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <span>待分发问题 ({{ pendingProblems.length }})</span>
          <el-radio-group v-model="filterType" size="small">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="project">项目阶段</el-radio-button>
            <el-radio-button label="production">量产阶段</el-radio-button>
          </el-radio-group>
        </div>
      </template>

      <el-table :data="filteredProblems" stripe border v-loading="loading">
        <el-table-column prop="problemNo" label="问题编号" width="120" fixed />
        <el-table-column prop="title" label="问题标题" min-width="200" show-overflow-tooltip />
        <el-table-column prop="level" label="等级" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="getLevelType(row.level)" effect="dark">{{ row.level }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="source" label="来源" width="100" align="center" />
        <el-table-column prop="phase" label="阶段" width="100" align="center" />
        <el-table-column prop="ownership" label="归属" width="100" align="center" />
        <el-table-column prop="createTime" label="创建时间" width="120" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleDistribute(row)">分发</el-button>
            <el-button type="warning" link @click="handleReject(row)">驳回</el-button>
            <el-button type="info" link @click="handleViewDetail(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分发弹窗 -->
    <el-dialog v-model="distributeDialogVisible" title="问题分发" width="600px" destroy-on-close>
      <el-form :model="distributeForm" label-width="100px">
        <el-descriptions :column="2" border style="margin-bottom: 20px">
          <el-descriptions-item label="问题编号">{{ currentProblem?.problemNo }}</el-descriptions-item>
          <el-descriptions-item label="问题等级">
            <el-tag :type="getLevelType(currentProblem?.level)" effect="dark">{{ currentProblem?.level }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="问题标题" :span="2">{{ currentProblem?.title }}</el-descriptions-item>
        </el-descriptions>

        <el-form-item label="责任部门" required>
          <el-select v-model="distributeForm.dept" placeholder="请选择责任部门" style="width: 100%">
            <el-option label="生产部" value="生产部" />
            <el-option label="质量部" value="质量部" />
            <el-option label="技术部" value="技术部" />
            <el-option label="采购部" value="采购部" />
            <el-option label="设备部" value="设备部" />
          </el-select>
        </el-form-item>

        <el-form-item label="责任人" required>
          <el-select v-model="distributeForm.assignee" placeholder="请选择责任人" style="width: 100%">
            <el-option label="张工" value="张工" />
            <el-option label="李工" value="李工" />
            <el-option label="王工" value="王工" />
            <el-option label="刘工" value="刘工" />
            <el-option label="陈工" value="陈工" />
          </el-select>
        </el-form-item>

        <el-form-item label="计划完成日期" required>
          <el-date-picker v-model="distributeForm.deadline" type="date" placeholder="选择日期" style="width: 100%" />
        </el-form-item>

        <el-form-item label="分发备注">
          <el-input v-model="distributeForm.remark" type="textarea" :rows="3" placeholder="请输入分发备注" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="distributeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmDistribute">确认分发</el-button>
      </template>
    </el-dialog>

    <!-- 详情弹窗 -->
    <el-dialog v-model="detailDialogVisible" title="问题详情" width="800px" destroy-on-close>
      <el-descriptions :column="2" border v-if="currentProblem">
        <el-descriptions-item label="问题编号">{{ currentProblem.problemNo }}</el-descriptions-item>
        <el-descriptions-item label="问题等级">
          <el-tag :type="getLevelType(currentProblem.level)" effect="dark">{{ currentProblem.level }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="问题标题" :span="2">{{ currentProblem.title }}</el-descriptions-item>
        <el-descriptions-item label="问题描述" :span="2">{{ currentProblem.description }}</el-descriptions-item>
        <el-descriptions-item label="问题来源">{{ currentProblem.source }}</el-descriptions-item>
        <el-descriptions-item label="问题阶段">{{ currentProblem.phase }}</el-descriptions-item>
        <el-descriptions-item label="问题归属">{{ currentProblem.ownership }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ currentProblem.createTime }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useProblemStore } from '@/store/problemStore'

const problemStore = useProblemStore()

const loading = ref(false)
const filterType = ref('all')
const distributeDialogVisible = ref(false)
const detailDialogVisible = ref(false)
const currentProblem = ref(null)

const distributeForm = reactive({
  dept: '',
  assignee: '',
  deadline: '',
  remark: ''
})

const pendingProblems = computed(() =>
  problemStore.problemList.filter(p => p.status === '待分发')
)

const filteredProblems = computed(() => {
  if (filterType.value === 'all') return pendingProblems.value
  return pendingProblems.value.filter(p =>
    filterType.value === 'project' ? p.phase === '项目阶段' : p.phase === '量产阶段'
  )
})

const getLevelType = (level) => problemStore.getLevelType(level)

const handleDistribute = (row) => {
  currentProblem.value = row
  distributeForm.dept = row.dept
  distributeForm.assignee = row.assignee
  distributeForm.deadline = row.deadline
  distributeForm.remark = ''
  distributeDialogVisible.value = true
}

const confirmDistribute = () => {
  if (!distributeForm.dept || !distributeForm.assignee || !distributeForm.deadline) {
    ElMessage.warning('请填写必填项')
    return
  }
  problemStore.updateProblemStatus(currentProblem.value.problemNo, '处理中')
  ElMessage.success(`问题 ${currentProblem.value.problemNo} 已分发`)
  distributeDialogVisible.value = false
}

const handleReject = (row) => {
  ElMessageBox.confirm('确定要驳回此问题吗?', '驳回确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.info('问题已驳回')
  })
}

const handleViewDetail = (row) => {
  currentProblem.value = row
  detailDialogVisible.value = true
}
</script>

<style scoped lang="scss">
.page-container {
  .page-title {
    margin: 0 0 20px 0;
    font-size: 20px;
    font-weight: 600;
    color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
