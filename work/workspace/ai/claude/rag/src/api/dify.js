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
export function sendChatMessage({ query, category = '', conversation_id = '', conversationHistory = [], onMessage, onThinking, onSource, onDone, onError, onConversationId }) {
  const controller = new AbortController()

  const requestBody = {
    query,
    inputs: {
      category: category,
      userinput: {
        query: query,
        files: []
      }
    },
    conversation_id,
    response_mode: 'streaming',
    user: 'mini-program'
  }

  console.log('[Dify] Request:', JSON.stringify(requestBody, null, 2))

  fetch(`${API_URL}/chat-messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify(requestBody),
    signal: controller.signal
  })
  .then(async response => {
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API Error ${response.status}: ${errorText}`)
    }
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

              // 保存 conversation_id（如果返回了新的）
              if (data.conversation_id && onConversationId) {
                onConversationId(data.conversation_id)
              }

              // 处理不同事件类型
              switch (data.event) {
                case 'message':
                  // 解析思考过程（<think>...</think>标签）
                  const thinkingMatch = (data.answer || '').match(/<think>([\s\S]*?)<\/think>/)
                  const thinking = thinkingMatch ? thinkingMatch[1].trim() : ''
                  if (thinking) {
                    onThinking?.(thinking)
                  }
                  // 移除思考过程标签后传给消息回调
                  const cleanAnswer = (data.answer || '').replace(/<think>[\s\S]*?<\/think>/g, '').trim()
                  onMessage?.(cleanAnswer, false)
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
                // 工作流节点事件（忽略）
                case 'workflow_started':
                case 'node_started':
                case 'ping':
                case 'workflow_finished':
                  break
                case 'node_finished':
                  console.log('[Dify] node_finished:', data.data?.node_type, data.data?.title)
                  // 从 parameter-extractor 节点提取思考过程
                  if (data.data?.node_type === 'parameter-extractor' && data.data?.inputs?.query) {
                    console.log('[Dify] query content:', data.data.inputs.query.substring(0, 200))
                    const thinkingMatch = data.data.inputs.query.match(/<think>([\s\S]*?)<\/think>/)
                    if (thinkingMatch) {
                      console.log('[Dify] thinking extracted:', thinkingMatch[1])
                      onThinking?.(thinkingMatch[1].trim())
                    } else {
                      console.log('[DifDif] no thinking tag found in query')
                    }
                  }
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
