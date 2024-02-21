<script setup>
import { useUserStore } from '@/stores/user'
import { supabase } from '@/supabase'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const { user } = storeToRefs(useUserStore())

const loading = ref(false)

const logout = async () => {
  loading.value = true
  await supabase.auth.signOut()
  router.push('/login')
}
</script>

<template>
  <header class="flex items-center p-3 border-b border-b-slate-700">
    <div v-if="user">{{ user.username }}</div>
    <button
      :loading="loading"
      @click="logout"
      class="p-2 ml-auto transition-colors duration-200 ease-in-out rounded-md outline hover:bg-slate-600"
    >
      <span v-if="loading">...</span>
      <span v-else>Se déconnecter</span>
    </button>
  </header>
</template>
