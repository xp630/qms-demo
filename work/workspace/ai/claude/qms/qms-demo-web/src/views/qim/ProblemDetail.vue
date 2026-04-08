<template>
  <div class="page-container">
    <h2 class="page-title">问题详情</h2>

    <el-card shadow="hover" class="detail-card">
      <template #header>
        <div class="card-header">
          <span>问题信息</span>
          <el-button type="primary" link>编辑</el-button>
        </div>
      </template>

      <el-descriptions :column="2" border>
        <el-descriptions-item label="问题编号">Q2024-001</el-descriptions-item>
        <el-descriptions-item label="问题等级">
          <el-tag type="danger" effect="dark">S</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="问题状态">
          <el-tag type="warning">处理中</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="责任部门">生产部</el-descriptions-item>
        <el-descriptions-item label="问题来源">生产过程</el-descriptions-item>
        <el-descriptions-item label="责任人">张工</el-descriptions-item>
        <el-descriptions-item label="问题标题" :span="2">焊接不良导致气密性不合格</el-descriptions-item>
        <el-descriptions-item label="问题描述" :span="2">在生产过程中发现焊缝存在气泡，导致气密性测试不合格，需要返修处理。</el-descriptions-item>
      </el-descriptions>

      <!-- 状态流转 -->
      <div class="status-flow">
        <el-steps :active="2" finish-status="success" align-center>
          <el-step title="问题创建" description="2024-04-01 09:00" />
          <el-step title="问题分发" description="2024-04-01 10:30" />
          <el-step title="原因分析" description="2024-04-02 14:00" />
          <el-step title="措施制定" />
          <el-step title="效果验证" />
          <el-step title="问题关闭" />
        </el-steps>
      </div>
    </el-card>

    <!-- 处理记录 -->
    <el-card shadow="hover" class="detail-card">
      <template #header>
        <div class="card-header">
          <span>处理记录</span>
          <el-button type="primary" size="small" @click="handleAddRecord">添加记录</el-button>
        </div>
      </template>

      <el-timeline>
        <el-timeline-item timestamp="2024-04-02 14:00" type="primary" placement="top">
          <el-card shadow="hover">
            <h4>原因分析完成</h4>
            <p>经分析，焊接不良原因如下：</p>
            <ol style="margin: 10px 0; padding-left: 20px;">
              <li>焊枪温度设置偏低</li>
              <li>焊接速度过快</li>
              <li>母材表面有油污</li>
            </ol>
            <p>分析人：张工</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2024-04-01 10:30" type="warning" placement="top">
          <el-card shadow="hover">
            <h4>问题已分发</h4>
            <p>问题已分发至生产部，由张工负责处理。</p>
            <p>要求完成日期：2024-04-10</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2024-04-01 09:00" type="success" placement="top">
          <el-card shadow="hover">
            <h4>问题创建</h4>
            <p>生产过程中发现焊接不良问题，现场质检员李四提交问题报告。</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>

    <!-- 附件 -->
    <el-card shadow="hover" class="detail-card">
      <template #header>
        <div class="card-header">
          <span>相关附件</span>
          <el-button type="primary" size="small">上传附件</el-button>
        </div>
      </template>

      <el-table :data="attachments" border>
        <el-table-column prop="fileName" label="文件名称" />
        <el-table-column prop="fileType" label="文件类型" width="100" />
        <el-table-column prop="fileSize" label="文件大小" width="100" />
        <el-table-column prop="uploadTime" label="上传时间" width="160" />
        <el-table-column prop="uploader" label="上传人" width="100" />
        <el-table-column label="操作" width="120">
          <template #default>
            <el-button type="primary" link>下载</el-button>
            <el-button type="primary" link>预览</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const attachments = ref([
  { fileName: '焊接不良照片.jpg', fileType: 'JPG', fileSize: '2.5MB', uploadTime: '2024-04-01 09:15', uploader: '李四' },
  { fileName: '气密性检测报告.pdf', fileType: 'PDF', fileSize: '1.2MB', uploadTime: '2024-04-01 09:20', uploader: '李四' },
  { fileName: '原因分析.docx', fileType: 'DOCX', fileSize: '156KB', uploadTime: '2024-04-02 14:30', uploader: '张工' }
])

const handleAddRecord = () => {
  // 添加记录逻辑
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

  .detail-card {
    margin-bottom: 20px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .status-flow {
    margin-top: 30px;
    padding: 20px 0;
  }
}
</style>
