<template>
  <div class="message" :class="message.role">
    <div v-if="message.role === 'assistant'" class="avatar">
      💡
    </div>
    <div class="content-wrapper">
      <div class="content">{{ message.content }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  margin-bottom: 12px;

  &.user {
    justify-content: flex-end;

    .content-wrapper {
      max-width: 75%;
    }

    .content {
      background: #07c160;
      color: #fff;
      border-radius: 18px 18px 4px 18px;
    }
  }

  &.assistant {
    justify-content: flex-start;

    .avatar {
      width: 36px;
      height: 36px;
      background: #07c160;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      flex-shrink: 0;
    }

    .content-wrapper {
      max-width: 80%;
    }

    .content {
      background: #fff;
      color: #1a1a1a;
      border-radius: 18px 18px 18px 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }
  }
}

.content {
  padding: 10px 14px;
  font-size: 15px;
  line-height: 1.6;
  word-break: break-word;
}
</style>
