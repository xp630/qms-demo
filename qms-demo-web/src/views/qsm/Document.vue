<template>
  <div class="page-container">
    <h2 class="page-title">文件管理</h2>

    <el-card shadow="hover">
      <template #header>
        <div class="card-header">
          <el-radio-group v-model="viewType">
            <el-radio-button label="list">列表视图</el-radio-button>
            <el-radio-button label="card">卡片视图</el-radio-button>
          </el-radio-group>
          <el-button type="primary">
            <el-icon><Upload /></el-icon> 上传文件
          </el-button>
        </div>
      </template>

      <!-- 列表视图 -->
      <el-table v-if="viewType === 'list'" :data="documentList" stripe border>
        <el-table-column prop="docNo" label="文件编号" width="120" />
        <el-table-column prop="title" label="文件标题" show-overflow-tooltip />
        <el-table-column prop="version" label="版本" width="80" align="center">
          <template #default="{ row }">
            <el-tag type="info">{{ row.version }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="dept" label="编制部门" width="100" align="center" />
        <el-table-column prop="updateTime" label="更新时间" width="120" />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === '有效' ? 'success' : 'warning'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default>
            <el-button type="primary" link>查看</el-button>
            <el-button type="primary" link>下载</el-button>
            <el-button type="primary" link>版本历史</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 卡片视图 -->
      <el-row v-else :gutter="20">
        <el-col v-for="doc in documentList" :key="doc.id" :span="6">
          <el-card shadow="hover" class="doc-card">
            <div class="doc-icon">
              <el-icon :size="48" color="#409EFF"><Document /></el-icon>
            </div>
            <div class="doc-title">{{ doc.title }}</div>
            <div class="doc-info">
              <span>{{ doc.docNo }}</span>
              <el-tag size="small" type="info">{{ doc.version }}</el-tag>
            </div>
            <div class="doc-meta">
              <span>{{ doc.dept }}</span>
              <span>{{ doc.updateTime }}</span>
            </div>
            <div class="doc-actions">
              <el-button type="primary" link size="small">查看</el-button>
              <el-button type="primary" link size="small">下载</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Upload, Document } from '@element-plus/icons-vue'
import { documentList } from '@/mock'

const viewType = ref('list')
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

  .doc-card {
    text-align: center;
    margin-bottom: 20px;

    .doc-icon {
      padding: 20px 0;
    }

    .doc-title {
      font-size: 16px;
      font-weight: 600;
      color: #00e5ff; text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
      margin-bottom: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .doc-info {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 8px;
    }

    .doc-meta {
      font-size: 12px;
      color: #94a3b8;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
    }

    .doc-actions {
      border-top: 1px solid #eee;
      padding-top: 10px;
    }
  }
}
</style>
