<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useThemeStore } from './store/themeStore'
import { onMounted } from 'vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  height: 100%;
}

/* 默认深色主题 */
html.theme-dark {
  background: #0d1525;
}

#app.theme-dark {
  background: #0d1525;
}

/* 浅色主题 */
html.theme-light {
  background: #f5f7fa;
}

#app.theme-light {
  background: #f5f7fa;
}
</style>
