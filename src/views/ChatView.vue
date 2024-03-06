<script setup>
import { onMounted, ref } from 'vue'
import ChatMessage from '@/components/ChatMessage.vue'
import AppNavbar from '@/components/AppNavbar.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import {
  messageList,
  insertMessage,
  fetchMessages,
  subscribeToMessages,
  deleteMessage
} from '@/api/messages'

const { user } = storeToRefs(useUserStore())

const messageText = ref('')

subscribeToMessages()

onMounted(async () => {
  await fetchMessages()
  scrollToBottom()
})

const textarea = ref(null)

const addMessage = async () => {
  await insertMessage(messageText.value, user.value.id)
  messageText.value = ''
}

const messagesContainer = ref(null)

const scrollToBottom = () => {
  messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
}
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <AppNavbar />
    <div class="overflow-auto grow" ref="messagesContainer">
      <div v-for="(message, index) in messageList" class="p-4" :key="index">
        <ChatMessage @delete="deleteMessage" :message="message"></ChatMessage>
      </div>
    </div>
    <div class="flex p-4 border-t align-center border-t-slate-700">
      <textarea
        ref="textarea"
        @keyup.enter.exact="addMessage"
        v-model="messageText"
        placeholder="Écrivez un message..."
        name="message"
        id="message"
        rows="1"
        class="p-3 text-black rounded-md resize-none grow"
      ></textarea>
      <button @click="addMessage" class="p-2 ml-3 bg-blue-600 rounded-md">Envoyer</button>
    </div>
  </div>
</template>
