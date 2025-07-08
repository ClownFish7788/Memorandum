import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useItemStore } from '@/stores/index'

export const useGlobalStore = defineStore('global-store', () => {
  const itemStore = useItemStore()
  const globalType = ref('')
  const globalItemList = ref([]) // 用于存储清单
  const globalId = ref()

  const getGlobalType = (item) => {
    globalType.value = item.name
    if(item?.type !== 'tab') {
      const newList = itemStore.findItem(item.content.map(item => item.id))
      // 使用splice可以保持响应式
      globalItemList.value.splice(0, globalItemList.value.length, newList)
    }else{
      globalItemList.value.splice(0, globalItemList.value.length)
    }
    globalId.value = item.id
  }
  return {
    globalType,
    globalItemList,
    getGlobalType
  }
},
{
  persist: true
})
