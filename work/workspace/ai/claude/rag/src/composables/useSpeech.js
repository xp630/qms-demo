import { ref, onUnmounted } from 'vue'

export function useSpeech() {
  const isListening = ref(false)
  const transcript = ref('')
  const error = ref(null)

  let recognition = null

  // 检测浏览器支持
  const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window

  function initRecognition() {
    if (!isSupported) {
      error.value = '当前浏览器不支持语音识别'
      return null
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    recognition = new SpeechRecognition()

    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'zh-CN'

    recognition.onstart = () => {
      isListening.value = true
      error.value = null
    }

    recognition.onresult = (event) => {
      let finalTranscript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        }
      }
      if (finalTranscript) {
        transcript.value += finalTranscript
      }
    }

    recognition.onerror = (event) => {
      error.value = event.error
      isListening.value = false
    }

    recognition.onend = () => {
      isListening.value = false
    }

    return recognition
  }

  function start() {
    if (!recognition) {
      recognition = initRecognition()
    }
    if (recognition) {
      transcript.value = ''
      recognition.start()
    }
  }

  function stop() {
    if (recognition) {
      recognition.stop()
    }
  }

  function toggle() {
    if (isListening.value) {
      stop()
    } else {
      start()
    }
  }

  onUnmounted(() => {
    if (recognition) {
      recognition.abort()
    }
  })

  return {
    isSupported,
    isListening,
    transcript,
    error,
    start,
    stop,
    toggle
  }
}
