<template>
  <div class="page-container">
    <h2 class="page-title">问题列表</h2>

    <!-- 搜索表单 -->
    <el-card shadow="hover" class="search-card">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="问题编号">
          <el-input v-model="searchForm.problemNo" placeholder="请输入问题编号" clearable />
        </el-form-item>
        <el-form-item label="问题等级">
          <el-select v-model="searchForm.level" placeholder="全部" clearable style="width: 120px">
            <el-option v-for="l in problemLevels" :key="l" :label="`${l}级`" :value="l" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="全部" clearable style="width: 120px">
            <el-option v-for="s in problemStatuses" :key="s" :label="s" :value="s" />
          </el-select>
        </el-form-item>
        <el-form-item label="责任部门">
          <el-select v-model="searchForm.dept" placeholder="全部" clearable style="width: 120px">
            <el-option label="生产部" value="生产部" />
            <el-option label="质量部" value="质量部" />
            <el-option label="技术部" value="技术部" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon> 查询
          </el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 操作按钮 -->
    <div class="table-toolbar">
      <el-button type="primary" @click="handleCreate">
        <el-icon><Plus /></el-icon> 创建问题
      </el-button>
      <el-button type="success" @click="handleExport">
        <el-icon><Download /></el-icon> 导出
      </el-button>
    </div>

    <!-- 问题列表 -->
    <el-table :data="filteredProblems" stripe border v-loading="loading">
      <el-table-column prop="problemNo" label="问题编号" width="130" fixed />
      <el-table-column prop="title" label="问题标题" min-width="200" show-overflow-tooltip />
      <el-table-column prop="level" label="等级" width="70" align="center">
        <template #default="{ row }">
          <el-tag :type="getLevelType(row.level)" effect="dark" size="small">{{ row.level }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)" size="small">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="进度" width="140" align="center">
        <template #default="{ row }">
          <div class="progress-cell">
            <span class="progress-text">{{ row.progress }}/4</span>
            <el-progress :percentage="(row.progress / 4) * 100" :color="getProgressColor(row.progress)" :show-text="false" size="small" :stroke-width="6" style="width: 80px" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="dept" label="责任部门" width="100" align="center" />
      <el-table-column prop="assignee" label="责任人" width="80" align="center" />
      <el-table-column prop="deadline" label="计划完成" width="100" align="center" />
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleDetail(row)">详情</el-button>
          <el-button type="primary" link @click="handleProcess(row)">处理</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50]"
        :total="filteredProblems.length"
        layout="total, sizes, prev, pager, next"
      />
    </div>

    <!-- 问题详情弹窗 -->
    <el-dialog v-model="detailVisible" title="问题详情" width="800px" destroy-on-close>
      <el-descriptions :column="2" border v-if="currentProblem">
        <el-descriptions-item label="问题编号">{{ currentProblem.problemNo }}</el-descriptions-item>
        <el-descriptions-item label="问题等级">
          <el-tag :type="getLevelType(currentProblem.level)" effect="dark">{{ currentProblem.level }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(currentProblem.status)">{{ currentProblem.status }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="责任部门">{{ currentProblem.dept }}</el-descriptions-item>
        <el-descriptions-item label="问题来源">{{ currentProblem.source }}</el-descriptions-item>
        <el-descriptions-item label="责任人">{{ currentProblem.assignee }}</el-descriptions-item>
        <el-descriptions-item label="问题阶段">{{ currentProblem.phase }}</el-descriptions-item>
        <el-descriptions-item label="问题归属">{{ currentProblem.ownership }}</el-descriptions-item>
        <el-descriptions-item label="问题标题" :span="2">{{ currentProblem.title }}</el-descriptions-item>
        <el-descriptions-item label="问题描述" :span="2">{{ currentProblem.description }}</el-descriptions-item>
      </el-descriptions>

      <!-- 4阶段进度 -->
      <el-steps :active="currentProblem.progress" finish-status="success" align-center style="margin-top: 24px">
        <el-step title="原因分析" />
        <el-step title="短期措施" />
        <el-step title="长期措施" />
        <el-step title="验证关闭" />
      </el-steps>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Search, Plus, Download } from '@element-plus/icons-vue'
import { useProblemStore } from '@/store/problemStore'
import { getProgressColor } from '@/utils/qualityColors'

const router = useRouter()
const problemStore = useProblemStore()

const loading = ref(false)
const searchForm = reactive({ problemNo: '', level: '', status: '', dept: '' })
const pagination = reactive({ page: 1, pageSize: 10 })
const detailVisible = ref(false)
const currentProblem = ref(null)

const problemLevels = computed(() => problemStore.problemLevels)
const problemStatuses = computed(() => problemStore.problemStatuses)

const filteredProblems = computed(() => {
  let list = problemStore.problemList
  if (searchForm.problemNo) list = list.filter(p => p.problemNo.includes(searchForm.problemNo))
  if (searchForm.level) list = list.filter(p => p.level === searchForm.level)
  if (searchForm.status) list = list.filter(p => p.status === searchForm.status)
  if (searchForm.dept) list = list.filter(p => p.dept === searchForm.dept)
  return list
})

const getLevelType = (level) => problemStore.getLevelType(level)
const getStatusType = (status) => problemStore.getStatusType(status)

const handleSearch = () => { loading.value = true; setTimeout(() => { loading.value = false; ElMessage.success('查询成功') }, 300) }
const handleReset = () => { Object.assign(searchForm, { problemNo: '', level: '', status: '', dept: '' }); handleSearch() }
const handleCreate = () => router.push('/qim/problem-create')
const handleExport = () => ElMessage.success('导出成功')
const handleDetail = (row) => { currentProblem.value = row; detailVisible.value = true }
const handleProcess = (row) => router.push(`/qim/problem-detail/${row.id}`)
</script>

<style scoped lang="scss">
.page-container {
  .page-title { margin: 0 0 20px 0; font-size: 20px; font-weight: 600; color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5); }
  .table-toolbar { margin-bottom: 16px; }
  .pagination-container { margin-top: 20px; display: flex; justify-content: flex-end; }
  .progress-cell { display: flex; align-items: center; gap: 8px; .progress-text { font-size: 12px; color: #94a3b8; } }
}
</style>
