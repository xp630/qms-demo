/**
 * Dify 流式对话 API 封装
 */

const API_URL = import.meta.env.VITE_DIFY_API_URL || 'http://localhost/v1'
const API_KEY = import.meta.env.VITE_DIFY_API_KEY || ''

/**
 * 发送流式对话消息
 * @param {Object} params
 * @param {string} params.query - 用户问题
 * @param {string} params.conversation_id - 会话 ID
 * @param {Function} params.onMessage - 消息回调
 * @param {Function} params.onThinking - 思考过程回调
 * @param {Function} params.onSource - 来源引用回调
 * @param {Function} params.onDone - 完成回调
 * @param {Function} params.onError - 错误回调
 * @returns {AbortController}
 */
export function sendChatMessage({ query, conversation_id = '', onMessage, onThinking, onSource, onDone, onError }) {
  const controller = new AbortController()

  fetch(`${API_URL}/chat-messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      query,
      conversation_id,
      response_mode: 'streaming',
      user: 'mini-program'
    }),
    signal: controller.signal
  })
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok')
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    function read() {
      reader.read().then(({ done, value }) => {
        if (done) {
          onDone?.()
          return
        }

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))

              // 处理不同事件类型
              switch (data.event) {
                case 'message':
                  onMessage?.(data.answer || '', false)
                  break
                case 'message_end':
                  // 消息结束，可能包含来源
                  if (data.metadata?.retriever_resources) {
                    onSource?.(data.metadata.retriever_resources)
                  }
                  break
                case 'message_replace':
                  onMessage?.(data.answer || '', true)
                  break
                case 'agent_thought':
                  onThinking?.(data.thought || '')
                  break
                case 'error':
                  onError?.(new Error(data.message || 'Unknown error'))
                  break
              }
            } catch (e) {
              // 忽略解析错误
            }
          }
        }

        read()
      })
    }

    read()
  })
  .catch(error => {
    if (error.name === 'AbortError') return
    onError?.(error)
  })

  return controller
}

/**
 * 获取会话历史
 */
export function getConversations() {
  return fetch(`${API_URL}/conversations`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  }).then(res => res.json())
}

/**
 * 获取指定会话的消息历史
 */
export function getMessages(conversation_id) {
  return fetch(`${API_URL}/conversations/${conversation_id}/messages`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  }).then(res => res.json())
}
