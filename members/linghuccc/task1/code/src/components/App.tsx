import { useState, useEffect } from 'react'
import Header from './Header'
import ToDoList from './ToDoList'
import AddToDo from './AddToDo'

interface Todo {
	id: string
	text: string
	completed: boolean
}

export default function App() {
	const [todos, setTodos] = useState<Todo[]>([])
	const [newTodoText, setNewTodoText] = useState('')

	// In strict mode, useEffect with no dependency will load twice when page loads
	// `if (storedTodos)` is important, it makes sure `todos` won't be set when localStorage does not have 'todos'
	useEffect(() => {
		// console.log('getItem')
		// Load todos from local storage when the component mounts
		const storedTodos = localStorage.getItem('todos')
		if (storedTodos) {
			try {
				setTodos(JSON.parse(storedTodos) as Todo[])
				// console.log('storedTodos is', storedTodos)
			} catch (error) {
				console.error('Could not parse todos from localStorage', error)
			}
		}
	}, [])

	// useEffect with dependency will also load when component (`todos`) mounts
	// when `todos` mounts, it is null
	// if `setItem` without check `todos.length`, `todos` will always be set to null when refreshing
	useEffect(() => {
		// console.log('setItem')
		if (todos.length > 0) {
			localStorage.setItem('todos', JSON.stringify(todos))
			// console.log('todos is ', todos)
		} else {
			localStorage.removeItem('todos')
			// console.log('todos removed')
		}
	}, [todos])

	const addTodo = () => {
		if (newTodoText.trim() !== '') {
			const newTodo: Todo = {
				id: crypto.randomUUID(),
				text: newTodoText,
				completed: false,
			}
			setTodos((prevTodos) => [...prevTodos, newTodo])
			setNewTodoText('')
		}
	}

	const toggleTodoCompletion = (id: string) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		)
	}

	const deleteTodo = (id: string) => {
		setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
	}

	return (
		<>
			<Header />
			<div className="flex justify-center">
				<div className="max-w-[800px] w-full px-4">
					<AddToDo
						newTodoText={newTodoText}
						setNewTodoText={setNewTodoText}
						addTodo={addTodo}
					/>
					<ToDoList
						todos={todos}
						toggleTodoCompletion={toggleTodoCompletion}
						deleteTodo={deleteTodo}
					/>
				</div>
			</div>
		</>
	)
}
