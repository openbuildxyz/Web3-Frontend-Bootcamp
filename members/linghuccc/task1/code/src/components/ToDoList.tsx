import ToDoItem from './ToDoItem'

interface Todo {
	id: string
	text: string
	completed: boolean
}

interface ToDoListProps {
	todos: Todo[]
	toggleTodoCompletion: (id: string) => void
	deleteTodo: (id: string) => void
}

export default function ToDoList({
	todos,
	toggleTodoCompletion,
	deleteTodo,
}: ToDoListProps) {
	return (
		<ul>
			{todos.map((todo) => (
				<ToDoItem
					key={todo.id}
					todo={todo}
					toggleTodoCompletion={toggleTodoCompletion}
					deleteTodo={deleteTodo}
				/>
			))}
		</ul>
	)
}
