import { supabase } from '@/supabase'
import { ref } from 'vue'

export const messageList = ref([])

export const insertMessage = async (content, author_id) => {
  await supabase.from('messages').insert({
    content,
    author_id
  })
}

export const fetchMessages = async () => {
  const { data, error } = await supabase
    .from('messages')
    .select('*, author:profiles(username, id, avatar_url)')
    .order('created_at', { ascending: false })
    .limit(100)
  if (error) {
    console.error('Error fetching messages:', error)
  }
  messageList.value = data.reverse()
}

export const subscribeToMessages = () => {
  supabase
    .channel('messages_channel')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'messages'
      },
      async () => {
        await fetchMessages()
      }
    )
    .subscribe()
}

export const deleteMessage = async (id) => {
  const { error } = await supabase.from('messages').delete().eq('id', id)
  if (error) {
    console.error('Error deleting message:', error)
  }
}
