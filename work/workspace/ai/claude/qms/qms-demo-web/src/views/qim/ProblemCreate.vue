<template>
  <div class="page-container">
    <h2 class="page-title">创建问题</h2>

    <el-card shadow="hover">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="问题标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入问题标题" maxlength="200" show-word-limit />
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="问题类型" prop="type">
              <el-select v-model="form.type" placeholder="请选择问题类型" style="width: 100%">
                <el-option label="实物问题" value="实物问题" />
                <el-option label="虚拟问题" value="虚拟问题" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="问题等级" prop="level">
              <el-select v-model="form.level" placeholder="请选择问题等级" style="width: 100%">
                <el-option label="S-严重" value="S" />
                <el-option label="A-重大" value="A" />
                <el-option label="B-一般" value="B" />
                <el-option label="C-轻微" value="C" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="责任部门" prop="dept">
              <el-select v-model="form.dept" placeholder="请选择责任部门" style="width: 100%">
                <el-option label="生产部" value="生产部" />
                <el-option label="质量部" value="质量部" />
                <el-option label="采购部" value="采购部" />
                <el-option label="设备部" value="设备部" />
                <el-option label="技术部" value="技术部" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="问题来源" prop="source">
              <el-select v-model="form.source" placeholder="请选择问题来源" style="width: 100%">
                <el-option label="生产过程" value="生产过程" />
                <el-option label="市场反馈" value="市场反馈" />
                <el-option label="来料检验" value="来料检验" />
                <el-option label="过程检验" value="过程检验" />
                <el-option label="MES系统" value="MES系统" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="机台型号">
              <el-input v-model="form.machineModel" placeholder="请输入机台型号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目阶段">
              <el-select v-model="form.projectStage" placeholder="请选择项目阶段" style="width: 100%">
                <el-option label="项目阶段" value="项目阶段" />
                <el-option label="量产阶段" value="量产阶段" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="问题描述" prop="description">
          <el-input v-model="form.description" type="textarea" :rows="4" placeholder="请详细描述问题" />
        </el-form-item>

        <el-form-item label="附件上传">
          <el-upload
            action="#"
            :auto-upload="false"
            :limit="5"
            accept=".jpg,.png,.pdf,.doc,.docx"
          >
            <el-button type="primary" plain>
              <el-icon><Upload /></el-icon> 选择文件
            </el-button>
            <template #tip>
              <div class="el-upload__tip">支持jpg、png、pdf、doc格式，最多上传5个文件</div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="handleSaveDraft">保存草稿</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Upload } from '@element-plus/icons-vue'

const router = useRouter()
const formRef = ref(null)

const form = reactive({
  title: '',
  type: '',
  level: '',
  dept: '',
  source: '',
  machineModel: '',
  projectStage: '',
  description: ''
})

const rules = {
  title: [{ required: true, message: '请输入问题标题', trigger: 'blur' }],
  type: [{ required: true, message: '请选择问题类型', trigger: 'change' }],
  level: [{ required: true, message: '请选择问题等级', trigger: 'change' }],
  dept: [{ required: true, message: '请选择责任部门', trigger: 'change' }],
  source: [{ required: true, message: '请选择问题来源', trigger: 'change' }],
  description: [{ required: true, message: '请输入问题描述', trigger: 'blur' }]
}

const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('问题创建成功')
      router.push('/qim/problem-list')
    }
  })
}

const handleSaveDraft = () => {
  ElMessage.success('草稿保存成功')
}

const handleCancel = () => {
  router.back()
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

  .el-card {
    max-width: 900px;
  }
}
</style>
