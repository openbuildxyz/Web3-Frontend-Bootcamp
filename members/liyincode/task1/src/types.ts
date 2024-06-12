export interface ToDo {
  id: string
  text: string
  completed: boolean
  date: Date
}

export interface ToDoPayload {
  id: string
  text?: string
  completed?: boolean
  date?: Date
}

export type Action =
  | { type: 'ADD_TODO', payload: ToDo }
  | { type: 'TOGGLE_TODO', payload: { id: string } }
  | { type: 'REMOVE_TODO', payload: { id: string } }
