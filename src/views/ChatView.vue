<script setup>
import { onMounted, ref } from 'vue'
import ChatMessage from '@/components/ChatMessage.vue'
import AppNavbar from '@/components/AppNavbar.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { insertMessage, fetchMessages } from '@/api/messages'

const { user } = storeToRefs(useUserStore())

const messageText = ref('')
const messageList = ref([])

onMounted(async () => {
  messageList.value = await fetchMessages()
})

const textarea = ref(null)

const addMessage = async () => {
  console.log(messageText.value, user.value.id)
  await insertMessage(messageText.value, user.value.id)
  messageText.value = ''
}

const deleteMessage = (id) => {
  messageList.value = messageList.value.filter((message) => message.id !== id)
}
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <AppNavbar />
    <div class="overflow-auto grow">
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
