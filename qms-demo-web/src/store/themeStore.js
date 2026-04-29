// 主题状态管理
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // 从 localStorage 读取主题，或者默认深色主题
  const isDark = ref(localStorage.getItem('qms-theme') !== 'light')

  // 切换主题
  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  // 设置特定主题
  const setTheme = (theme) => {
    isDark.value = theme !== 'light'
  }

  // 应用主题到 body
  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.remove('theme-light')
      document.documentElement.classList.add('theme-dark')
    } else {
      document.documentElement.classList.remove('theme-dark')
      document.documentElement.classList.add('theme-light')
    }
  }

  // 监听主题变化，保存到 localStorage
  watch(isDark, (newValue) => {
    localStorage.setItem('qms-theme', newValue ? 'dark' : 'light')
    applyTheme()
  })

  // 初始化主题
  const initTheme = () => {
    applyTheme()
  }

  return {
    isDark,
    toggleTheme,
    setTheme,
    initTheme
  }
})
