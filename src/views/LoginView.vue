<script setup>
import { supabase } from '@/supabase'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { push: routerPush } = useRouter()

const email = ref('')
const password = ref('')

const onSubmit = async () => {
  if (!email.value || !password.value) return

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    alert(error.message)
  } else {
    routerPush({ name: 'chat' })
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-2 p-4 mx-auto max-w-96">
    <div class="flex flex-col">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" class="p-2 bg-slate-500" required />
    </div>
    <div class="flex flex-col">
      <label for="password">Mot de passe</label>
      <input type="password" id="password" v-model="password" class="p-2 bg-slate-500" required />
    </div>
    <button type="submit" class="p-2 mt-4 bg-blue-500 rounded-md">Se connecter</button>
  </form>
</template>
