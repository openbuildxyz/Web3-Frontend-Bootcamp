export interface TodoItemType {
  uuid: string
  text: string
  finish?: boolean
}

export interface TodoListDispatch {
  todoList: TodoItemType[]
  onSetList: (todoList: TodoItemType[]) => void
}
