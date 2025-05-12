import { ref } from 'vue'

const selectedItem = ref(null)

export function useMyData() {
  function setItem(item) {
    selectedItem.value = item
    sessionStorage.setItem('selectedItem', JSON.stringify(item))

  }

  function loadFromSession() {
    const cached = sessionStorage.getItem('selectedItem')    
    if (cached) selectedItem.value = JSON.parse(cached)
  }
 function removeFromSession() {
    sessionStorage.removeItem('selectedItem')
  }

  return {
    selectedItem,
    setItem,
    loadFromSession,
    removeFromSession
  }
}
