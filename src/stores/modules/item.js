import { defineStore } from "pinia"
import { ref } from 'vue'

export const useItemStore = defineStore('item-store', () => {
  const itemList = ref([])

  const addItem = (item) => {
    const maxId = itemList.value.length === 0 ? 0 : Math.map(...itemList.value.map(item => item.id))
    const id = maxId + 1
    item.id = id
    item.finished = false
    itemList.value.unshift(item)
  }

  return {
    itemList,
    addItem
  }
},
{
  persist: true
})
