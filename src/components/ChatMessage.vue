<script setup>
import { computed } from 'vue'
import { TrashIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete'])

const formatDate = (date) => {
  let formattedDay = date.toLocaleDateString()
  let formattedTime = date.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })
  return `${formattedDay} à ${formattedTime}`
}

const formattedDate = computed(() => {
  const date = new Date(props.message.created_at)
  return formatDate(date)
})

const avatarUrl = computed(() => {
  if (!props.message.author.avatar_url)
    return `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${props.message.author.username}`
  return props.message.author.avatar_url
})
</script>

<template>
  <div class="flex items-center">
    <img class="mr-2 rounded-full h-7 w-7" :src="avatarUrl" alt="avatar image" />
    {{ message.author.username }}
    <span class="ml-2 text-xs text-gray-300 text-opacity-80">
      {{ formattedDate }}
    </span>
    <button @click="emit('delete', message.id)" class="p-2 ml-2 rounded-full hover:bg-slate-500">
      <TrashIcon class="w-4 h-4" />
    </button>
  </div>
  <p class="overflow-hidden text-ellipsis text-nowrap">
    {{ message.content }}
  </p>
</template>
