// composables/useToast.js
import { ref } from 'vue'

const toasts = ref([])
let id = 0

export function useToast() {
  const showToast = (message, type = 'success', timeout = 3000) => {
    const toast = { id: id++, message, type }
    toasts.value.push(toast)

    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== toast.id)
    }, timeout)
  }

  return {
    toasts,
    showToast
  }
}
