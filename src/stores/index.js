import persist from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'
const pinia = createPinia()
pinia.use(persist)

export default pinia

export * from './modules/list'
export * from './modules/tab'
export * from './modules/global'
export * from './modules/item'
