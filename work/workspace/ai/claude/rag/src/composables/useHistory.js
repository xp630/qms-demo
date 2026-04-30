import { ref, watch } from 'vue'

const STORAGE_KEY = 'dify_chat_history'

export function useHistory() {
  const history = ref([])

  // 从 localStorage 加载
  function load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      history.value = data ? JSON.parse(data) : []
    } catch (e) {
      history.value = []
    }
  }

  // 保存到 localStorage
  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value))
    } catch (e) {
      console.error('Failed to save history:', e)
    }
  }

  // 添加会话
  function addSession(messages) {
    const firstUserMsg = messages.find(m => m.role === 'user')
    const firstAIResponse = messages.find(m => m.role === 'assistant' && m.content && m.id !== 'welcome')

    history.value.unshift({
      id: `session-${Date.now()}`,
      title: firstUserMsg?.content?.slice(0, 30) || '新对话',
      messages: [...messages],
      createdAt: Date.now()
    })

    // 最多保存 20 条
    if (history.value.length > 20) {
      history.value = history.value.slice(0, 20)
    }

    save()
  }

  // 删除会话
  function deleteSession(id) {
    history.value = history.value.filter(s => s.id !== id)
    save()
  }

  // 清空所有
  function clearAll() {
    history.value = []
    save()
  }

  // 获取指定会话
  function getSession(id) {
    return history.value.find(s => s.id === id)
  }

  // 初始化时加载
  load()

  return {
    history,
    addSession,
    deleteSession,
    clearAll,
    getSession,
    load
  }
}
