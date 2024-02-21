import ChatView from '@/views/ChatView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/supabase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'chat',
      component: ChatView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getSession()
  const isLoggedIn = !!data.session

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !isLoggedIn) {
    next({ name: 'login' })
  } else if (!requiresAuth && isLoggedIn) {
    next({ name: 'chat' })
  } else {
    next()
  }
})

export default router
