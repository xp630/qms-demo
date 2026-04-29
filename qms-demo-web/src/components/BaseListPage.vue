<template>
  <div class="base-list-page">
    <h2 class="page-title">{{ title }}</h2>

    <!-- 搜索表单 -->
    <div class="search-form" v-if="$slots.filter || filterFields.length > 0">
      <el-form :inline="true" :model="searchForm" class="search-form-inline">
        <slot name="filter">
          <el-form-item v-for="field in filterFields" :key="field.prop" :label="field.label">
            <el-input
              v-if="field.type === 'input'"
              v-model="searchForm[field.prop]"
              :placeholder="field.placeholder || `请输入${field.label}`"
              clearable
            />
            <el-select
              v-else-if="field.type === 'select'"
              v-model="searchForm[field.prop]"
              :placeholder="field.placeholder || `请选择${field.label}`"
              clearable
              style="width: 150px"
            >
              <el-option
                v-for="opt in field.options"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
            <el-date-picker
              v-else-if="field.type === 'date'"
              v-model="searchForm[field.prop]"
              type="date"
              :placeholder="field.placeholder || `请选择${field.label}`"
              style="width: 150px"
            />
          </el-form-item>
        </slot>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon> 查询
          </el-button>
          <el-button @click="handleReset">
            <el-icon><Refresh /></el-icon> 重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 操作按钮 -->
    <div class="table-toolbar" v-if="$slots.toolbar || showToolbar">
      <slot name="toolbar">
        <el-button v-if="showExport" type="primary" @click="handleExport">
          <el-icon><Download /></el-icon> 导出
        </el-button>
        <el-button v-if="showRefresh" @click="handleRefresh">
          <el-icon><Refresh /></el-icon> 刷新
        </el-button>
      </slot>
    </div>

    <!-- 表格 -->
    <el-table
      :data="displayData"
      stripe
      border
      v-loading="loading"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="showSelection" type="selection" width="55" />
      <el-table-column
        v-for="col in columns"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :fixed="col.fixed"
        :align="col.align || 'left'"
        :sortable="col.sortable ? 'custom' : false"
      >
        <template #default="{ row }" v-if="col.render">
          <component :is="col.render(row)" />
        </template>
      </el-table-column>
      <el-table-column v-if="showOperation" :label="operationLabel || '操作'" :width="operationWidth || 180" :fixed="operationFixed || 'right'">
        <template #default="{ row }">
          <slot name="operation" :row="row">
            <el-button type="primary" link @click.stop="handleView(row)">查看</el-button>
            <el-button v-if="showEdit" type="primary" link @click.stop="handleEdit(row)">编辑</el-button>
            <el-button v-if="showDelete" type="danger" link @click.stop="handleDelete(row)">删除</el-button>
          </slot>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container" v-if="showPagination">
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 详情弹窗 -->
    <el-dialog v-model="detailVisible" :title="detailTitle || '详情'" :width="detailWidth || '800px'" destroy-on-close>
      <slot name="detail" :row="currentRow">
        <el-descriptions :column="2" border>
          <el-descriptions-item v-for="item in detailFields" :key="item.prop" :label="item.label">
            {{ currentRow?.[item.prop] }}
          </el-descriptions-item>
        </el-descriptions>
      </slot>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Refresh, Download } from '@element-plus/icons-vue'

const props = defineProps({
  title: { type: String, default: '' },
  // 筛选字段配置
  filterFields: { type: Array, default: () => [] },
  // 表格列配置
  columns: { type: Array, default: () => [] },
  // 操作列配置
  showOperation: { type: Boolean, default: true },
  showEdit: { type: Boolean, default: true },
  showDelete: { type: Boolean, default: false },
  showSelection: { type: Boolean, default: false },
  showToolbar: { type: Boolean, default: true },
  showExport: { type: Boolean, default: true },
  showRefresh: { type: Boolean, default: true },
  showPagination: { type: Boolean, default: true },
  operationLabel: { type: String, default: '操作' },
  operationWidth: { type: [String, Number], default: 180 },
  operationFixed: { type: String, default: 'right' },
  // 详情配置
  detailTitle: { type: String, default: '详情' },
  detailWidth: { type: [String, Number], default: '800px' },
  detailFields: { type: Array, default: () => [] }
})

const emit = defineEmits(['search', 'reset', 'export', 'refresh', 'view', 'edit', 'delete', 'row-click'])

const loading = ref(false)
const searchForm = reactive({})
const pagination = reactive({ page: 1, pageSize: 10, total: 0 })
const tableData = ref([])
const selectedRows = ref([])
const detailVisible = ref(false)
const currentRow = ref(null)

// 初始化搜索表单
const initSearchForm = () => {
  props.filterFields.forEach(field => {
    searchForm[field.prop] = ''
  })
}

// 初始化分页
const initPagination = (total = 0) => {
  pagination.total = total
  pagination.page = 1
}

// 计算显示数据
const displayData = computed(() => {
  const start = (pagination.page - 1) * pagination.pageSize
  const end = start + pagination.pageSize
  return tableData.value.slice(start, end)
})

// 设置表格数据
const setTableData = (data) => {
  tableData.value = data || []
  pagination.total = tableData.value.length
}

// 获取搜索表单数据
const getSearchForm = () => ({ ...searchForm })

// 获取选中的行
const getSelectedRows = () => selectedRows.value

// 搜索
const handleSearch = () => {
  loading.value = true
  emit('search', { ...searchForm })
  setTimeout(() => { loading.value = false }, 300)
}

// 重置
const handleReset = () => {
  Object.keys(searchForm).forEach(key => { searchForm[key] = '' })
  emit('reset')
  handleSearch()
}

// 导出
const handleExport = () => {
  ElMessage.success('导出成功')
  emit('export', { ...searchForm })
}

// 刷新
const handleRefresh = () => {
  loading.value = true
  setTimeout(() => { loading.value = false; ElMessage.success('刷新成功') }, 300)
  emit('refresh')
}

// 查看
const handleView = (row) => {
  currentRow.value = row
  detailVisible.value = true
  emit('view', row)
}

// 编辑
const handleEdit = (row) => {
  emit('edit', row)
}

// 删除
const handleDelete = (row) => {
  emit('delete', row)
}

// 行点击
const handleRowClick = (row) => {
  emit('row-click', row)
}

// 选择变化
const handleSelectionChange = (selection) => {
  selectedRows.value = selection
}

// 分页大小变化
const handleSizeChange = (val) => {
  pagination.pageSize = val
  pagination.page = 1
}

// 页码变化
const handlePageChange = (val) => {
  pagination.page = val
}

// 暴露方法
defineExpose({
  setTableData,
  getSearchForm,
  getSelectedRows,
  loading,
  pagination,
  currentRow
})

// 初始化
initSearchForm()
</script>

<style scoped lang="scss">
.base-list-page {
  .page-title {
    margin: 0 0 20px 0;
    font-size: 20px;
    font-weight: 600;
    color: #00e5ff;
    text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
  }

  .search-form {
    background: rgba(20, 35, 60, 0.6);
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 16px;
    border: 1px solid rgba(0, 229, 255, 0.15);

    .search-form-inline {
      :deep(.el-form-item) {
        margin-bottom: 0;
      }
    }
  }

  .table-toolbar {
    margin-bottom: 16px;
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
