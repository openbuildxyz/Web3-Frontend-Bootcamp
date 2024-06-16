import React from 'react'

interface AddToDoProps {
	newTodoText: string
	setNewTodoText: (text: string) => void
	addTodo: () => void
}

export default function AddToDo({
	newTodoText,
	setNewTodoText,
	addTodo,
}: AddToDoProps) {
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoText(event.target.value)
	}

	const handleAddTodo = () => {
		addTodo()
	}

	return (
		<>
			<div className="flex justify-center my-8">
				<input
					type="text"
					value={newTodoText}
					onChange={handleInputChange}
					placeholder="Add a new todo"
					style={{ width: 600 }}
					className="mr-4 text-center"
				/>
				<button
					onClick={handleAddTodo}
					className="text-white rounded-full px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 transition-all ease-in duration-100"
				>
					Add
				</button>
			</div>
		</>
	)
}
