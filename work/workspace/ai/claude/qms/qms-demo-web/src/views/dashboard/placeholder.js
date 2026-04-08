// 占位页面 - 用于快速填充路由
export default {
  template: `
    <div class="page-container">
      <h2 class="page-title">{{ title }}</h2>
      <el-card shadow="hover">
        <el-empty :description="'正在开发中...'">
          <el-button type="primary">返回首页</el-button>
        </el-empty>
      </el-card>
    </div>
  `,
  props: {
    title: { type: String, default: '页面' }
  }
}
