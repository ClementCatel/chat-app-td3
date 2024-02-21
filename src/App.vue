<script setup>
import { supabase } from '@/supabase'
import { useUserStore } from '@/stores/user'

supabase.auth.onAuthStateChange((_, session) => {
  useUserStore().fetchUserProfile(session?.user?.id)
})
</script>

<template>
  <div class="h-full text-white bg-gray-800">
    <RouterView />
  </div>
</template>
