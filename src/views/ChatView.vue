<script setup>
import { ref } from 'vue'
import ChatMessage from '@/components/ChatMessage.vue'

const messageText = ref('')
const messageList = ref([])

const addMessage = () => {
  messageList.value.push({
    text: messageText.value,
    date: new Date(),
    user: {
      username: 'Clément',
      avatarUrl:
        'https://media.licdn.com/dms/image/C4D03AQH0TuKfHrOpfQ/profile-displayphoto-shrink_400_400/0/1607679351861?e=2147483647&v=beta&t=a2zxWJKCOT4EasStDlHtACsP2DwoH5fFWX6uudlQpe4'
    }
  })
}
</script>

<template>
  <div v-for="(message, index) in messageList" class="p-4" :key="index">
    <ChatMessage :message="message"></ChatMessage>
  </div>
  <div class="flex align-center p-4">
    <textarea
      v-model="messageText"
      name="message"
      id="message"
      rows="1"
      class="text-black rounded-md"
    ></textarea>
    <button @click="addMessage" class="p-2 bg-blue-600 rounded-md ml-3">Envoyer</button>
  </div>
</template>
