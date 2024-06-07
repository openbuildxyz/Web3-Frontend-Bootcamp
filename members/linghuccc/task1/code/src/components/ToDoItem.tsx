interface Todo {
	id: string
	text: string
	completed: boolean
}

interface ToDoItemProps {
	todo: Todo
	toggleTodoCompletion: (id: string) => void
	deleteTodo: (id: string) => void
}

export default function ToDoItem({
	todo,
	toggleTodoCompletion,
	deleteTodo,
}: ToDoItemProps) {
	const getBackgroundColor = () => {
		if (todo.completed) {
			return 'bg-blue-100'
		} else {
			return 'bg-yellow-100'
		}
	}

	return (
		<li className={`${getBackgroundColor()} rounded-md my-2 px-4 py-2`}>
			<div className="grid grid-cols-[40px,auto,120px] items-center">
				<div>
					<input
						type="checkbox"
						checked={todo.completed}
						onChange={() => toggleTodoCompletion(todo.id)}
					/>
				</div>
				<span
					style={{
						textDecoration: todo.completed
							? 'line-through'
							: 'none',
						color: todo.completed ? 'gray' : 'inherit',
					}}
				>
					{todo.text}
				</span>
				<button
					onClick={() => deleteTodo(todo.id)}
					className="text-white rounded-full mx-4 bg-gray-700 bg-opacity-50 hover:scale-105"
				>
					Delete
				</button>
			</div>
		</li>
	)
}
