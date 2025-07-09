import { defineStore } from "pinia"
import { ref } from 'vue'
import { useListStore } from "@/stores"
import { useGlobalStore } from "@/stores"

export const useItemStore = defineStore('item-store', () => {
  const itemList = ref([])
  const listStore = useListStore()
  const globalStore = useGlobalStore()
  const addItem = (item) => {
    const maxId = itemList.value.length === 0 ? 0 : Math.max(...itemList.value.map(item => item.id))
    const id = maxId + 1
    item.id = id
    item.finished = false
    itemList.value.unshift(item)
    listStore.addListItem(item.group, item)
    globalStore.getGlobalType()
  }

  const findItem = (list) => {
    if(!Array.isArray(list) || list.length === 0) return []
    const findItemList = itemList.value.filter(item => list.includes(item.id))
    return findItemList
  }

  const finishItem = (id) => {
    const index = itemList.value.findIndex(item => item.id === id)
    const [newItem = undefined] = itemList.value.splice(index, 1)
    newItem.finished = !newItem.finished
    itemList.value.splice(itemList.value.length, 0, newItem)
    globalStore.getGlobalType()
  }
  return {
    itemList,
    addItem,
    findItem,
    finishItem
  }
},
{
  persist: true
})
