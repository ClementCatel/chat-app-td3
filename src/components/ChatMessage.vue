<script setup>
import { computed } from 'vue'

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

const formatDate = (date) => {
  let formattedDay = date.toLocaleDateString()
  let formattedTime = date.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })

  return `${formattedDay} à ${formattedTime}`
}

const formattedDate = computed(() => {
  const date = props.message.date

  return formatDate(date)
})
</script>

<template>
  <div class="flex">
    <img class="h-7 w-7 rounded-full" :src="message.user.avatarUrl" alt="avatar image" />
    {{ message.user.username }}
    <span class="text-xs text-opacity-80 text-gray-300">
      {{ formattedDate }}
      <!-- // 25/01/2024 à hh:mm // Aujourd'hui à // Hier -->
    </span>
  </div>
</template>
