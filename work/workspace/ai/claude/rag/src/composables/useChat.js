import { ref, computed } from 'vue'
import { sendChatMessage } from '@/api/dify'
import { useFAQ } from './useFAQ'

export function useChat() {
  const messages = ref([])
  const conversationId = ref('')
  const isLoading = ref(false)
  const thinking = ref('')
  const sources = ref([])
  const isFAQMode = ref(false) // 是否处于 FAQ 模式

  let abortController = null
  const { matchFAQ } = useFAQ()

  // 欢迎语
  const welcomeMessage = {
    id: 'welcome',
    role: 'assistant',
    content: '您好！我是政策知识库助手，请问有什么可以帮您？',
    createdAt: Date.now()
  }

  // 发送消息
  function sendMessage(query) {
    if (!query.trim() || isLoading.value) return

    // 添加用户消息
    messages.value.push({
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      createdAt: Date.now()
    })

    // ========== FAQ 优先匹配 ==========
    // 只有在 FAQ 模式下才检查 FAQ
    const faqResult = matchFAQ(query)

    if (faqResult.matched && !isFAQMode.value) {
      // 匹配到 FAQ，直接返回预设答案
      messages.value.push({
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: faqResult.answer,
        thinking: '',
        sources: [],
        createdAt: Date.now()
      })
      // 切换到 FAQ 模式，后续问题走 Dify
      isFAQMode.value = true
      return
    }
    // =================================

    // 添加 AI 占位消息
    const aiMessageId = `ai-${Date.now()}`
    messages.value.push({
      id: aiMessageId,
      role: 'assistant',
      content: '',
      thinking: '',
      sources: [],
      createdAt: Date.now()
    })

    isLoading.value = true
    thinking.value = ''
    sources.value = []
    let fullContent = ''

    abortController = sendChatMessage({
      query,
      conversation_id: conversationId.value,
      onMessage: (content, isReplace) => {
        const lastMsg = messages.value[messages.value.length - 1]
        if (lastMsg && lastMsg.id === aiMessageId) {
          lastMsg.content = content
          if (isReplace) fullContent = content
        }
      },
      onThinking: (thought) => {
        thinking.value = thought
        const lastMsg = messages.value[messages.value.length - 1]
        if (lastMsg && lastMsg.id === aiMessageId) {
          lastMsg.thinking = thought
        }
      },
      onSource: (resources) => {
        sources.value = resources
        const lastMsg = messages.value[messages.value.length - 1]
        if (lastMsg && lastMsg.id === aiMessageId) {
          lastMsg.sources = resources
        }
      },
      onDone: () => {
        isLoading.value = false
        thinking.value = ''
      },
      onError: (error) => {
        isLoading.value = false
        thinking.value = ''
        const lastMsg = messages.value[messages.value.length - 1]
        if (lastMsg && lastMsg.id === aiMessageId) {
          lastMsg.content = '抱歉，发生了错误：' + error.message
        }
      }
    })
  }

  // 取消对话
  function cancelChat() {
    abortController?.abort()
    isLoading.value = false
  }

  // 新建会话
  function newChat() {
    cancelChat()
    messages.value = [welcomeMessage]
    conversationId.value = ''
    thinking.value = ''
    sources.value = []
    isFAQMode.value = false // 重置 FAQ 模式
  }

  // 初始化
  function init() {
    if (messages.value.length === 0) {
      messages.value = [welcomeMessage]
    }
  }

  return {
    messages,
    conversationId,
    isLoading,
    thinking,
    sources,
    isFAQMode,
    sendMessage,
    cancelChat,
    newChat,
    init
  }
}
