import { proxy } from 'valtio'
import { toDoList } from './modules/toDoList.ts'

const store = proxy({
    toDoList
})

export default store
