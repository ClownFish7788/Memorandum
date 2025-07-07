import { defineStore } from "pinia"
import { ref } from 'vue'
import { useListStore } from "./list"

export const useItemStore = defineStore('item-store', () => {
  const itemList = ref([])
  const listStore = useListStore()
  const addItem = (item) => {
    const maxId = itemList.value.length === 0 ? 0 : Math.max(...itemList.value.map(item => item.id))
    const id = maxId + 1
    item.id = id
    item.finished = false
    itemList.value.unshift(item)
    listStore.addListItem(item.group, item)
  }

  return {
    itemList,
    addItem
  }
},
{
  persist: true
})
