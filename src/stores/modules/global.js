import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('global-store', () => {
  const globalType = ref('tab1')
  const globalList = ref([])
  return {
    globalType,
    globalList
  }
},
{
  persist: true
})
