export interface Todo {
	id: string
	text: string
	completed: boolean
}

export interface ToDoItemProps {
	todo: Todo
	toggleTodoCompletion: (id: string) => void
	deleteTodo: (id: string) => void
}

export interface ToDoListProps {
	todos: Todo[]
	toggleTodoCompletion: (id: string) => void
	deleteTodo: (id: string) => void
}

export interface AddToDoProps {
	// newTodoText: string
	// setNewTodoText: (text: string) => void
	addTodo: (text: string) => void
}