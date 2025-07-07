import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('global-store', () => {
  const globalType = ref('')
  const globalList = ref([])

  const getGlobalType = (item) => {
    globalType.value = item.name
    globalList.value = item.content
  }
  return {
    globalType,
    globalList,
    getGlobalType
  }
},
{
  persist: true
})
