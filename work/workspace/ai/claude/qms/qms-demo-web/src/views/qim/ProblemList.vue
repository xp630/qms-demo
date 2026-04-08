<template>
  <div class="page-container">
    <h2 class="page-title">问题列表</h2>

    <!-- 搜索表单 -->
    <div class="search-form">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="问题编号">
          <el-input v-model="searchForm.problemNo" placeholder="请输入问题编号" clearable />
        </el-form-item>
        <el-form-item label="问题标题">
          <el-input v-model="searchForm.title" placeholder="请输入问题标题" clearable />
        </el-form-item>
        <el-form-item label="问题等级">
          <el-select v-model="searchForm.level" placeholder="全部" clearable>
            <el-option label="S-严重" value="S" />
            <el-option label="A-重大" value="A" />
            <el-option label="B-一般" value="B" />
            <el-option label="C-轻微" value="C" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="全部" clearable>
            <el-option label="待分发" value="待分发" />
            <el-option label="处理中" value="处理中" />
            <el-option label="待验证" value="待验证" />
            <el-option label="已关闭" value="已关闭" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon> 查询
          </el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

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
    <el-table :data="problemList" stripe border v-loading="loading">
      <el-table-column prop="problemNo" label="问题编号" width="130" fixed />
      <el-table-column prop="title" label="问题标题" show-overflow-tooltip />
      <el-table-column prop="level" label="等级" width="80" align="center">
        <template #default="{ row }">
          <el-tag :type="getLevelType(row.level)" effect="dark">{{ row.level }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="dept" label="责任部门" width="100" align="center" />
      <el-table-column prop="source" label="问题来源" width="100" align="center" />
      <el-table-column prop="assignee" label="责任人" width="80" align="center" />
      <el-table-column prop="createTime" label="创建时间" width="120" />
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
        :total="pagination.total"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 问题详情弹窗 -->
    <el-dialog v-model="detailVisible" title="问题详情" width="800px" destroy-on-close>
      <el-descriptions :column="2" border v-if="currentProblem">
        <el-descriptions-item label="问题编号">{{ currentProblem.problemNo }}</el-descriptions-item>
        <el-descriptions-item label="问题等级">
          <el-tag :type="getLevelType(currentProblem.level)" effect="dark">{{ currentProblem.level }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="问题状态">
          <el-tag :type="getStatusType(currentProblem.status)">{{ currentProblem.status }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="责任部门">{{ currentProblem.dept }}</el-descriptions-item>
        <el-descriptions-item label="问题来源" :span="2">{{ currentProblem.source }}</el-descriptions-item>
        <el-descriptions-item label="问题标题" :span="2">{{ currentProblem.title }}</el-descriptions-item>
      </el-descriptions>

      <!-- 状态流转 -->
      <el-steps :active="getStepActive(currentProblem?.status)" finish-status="success" class="problem-steps" v-if="currentProblem">
        <el-step title="问题创建" />
        <el-step title="问题分发" />
        <el-step title="原因分析" />
        <el-step title="措施制定" />
        <el-step title="效果验证" />
        <el-step title="问题关闭" />
      </el-steps>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Search, Plus, Download } from '@element-plus/icons-vue'
import { problemList as mockProblemList } from '@/mock'

const router = useRouter()
const loading = ref(false)
const searchForm = reactive({
  problemNo: '',
  title: '',
  level: '',
  status: ''
})

const problemList = ref([...mockProblemList])
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: mockProblemList.length
})

const detailVisible = ref(false)
const currentProblem = ref(null)

const getLevelType = (level) => {
  const map = { 'S': 'danger', 'A': 'warning', 'B': 'info', 'C': 'success' }
  return map[level] || ''
}

const getStatusType = (status) => {
  const map = { '待分发': 'info', '处理中': 'warning', '待验证': 'primary', '已关闭': 'success' }
  return map[status] || ''
}

const getStepActive = (status) => {
  const map = { '待分发': 0, '处理中': 1, '待验证': 3, '已关闭': 5 }
  return map[status] || 0
}

const handleSearch = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    ElMessage.success('查询成功')
  }, 500)
}

const handleReset = () => {
  Object.assign(searchForm, { problemNo: '', title: '', level: '', status: '' })
  handleSearch()
}

const handleCreate = () => {
  router.push('/qim/problem-create')
}

const handleExport = () => {
  ElMessage.success('导出成功')
}

const handleDetail = (row) => {
  currentProblem.value = row
  detailVisible.value = true
}

const handleProcess = (row) => {
  router.push(`/qim/problem-detail/${row.id}`)
}

const handleSizeChange = (val) => {
  pagination.pageSize = val
}

const handlePageChange = (val) => {
  pagination.page = val
}
</script>

<style scoped lang="scss">
.page-container {
  .page-title {
    margin: 0 0 20px 0;
    font-size: 20px;
    font-weight: 600;
    color: #303133;
  }

  .search-form {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 16px;
  }

  .table-toolbar {
    margin-bottom: 16px;
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .problem-steps {
    margin-top: 30px;
    padding: 0 20px;
  }
}
</style>
