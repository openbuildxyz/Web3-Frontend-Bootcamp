import { TodoItemType } from './types'
import { atomWithStorage } from 'jotai/utils'

export const todoListAtom = atomWithStorage<TodoItemType[]>('todoList', [
  {
    uuid: '1',
    text: 'Todo 1',
    finish: true
  },
  {
    uuid: '2',
    text: 'Learn React',
    finish: true
  },
  {
    uuid: '3',
    text: 'Learn Web3',
    finish: false
  },
])
