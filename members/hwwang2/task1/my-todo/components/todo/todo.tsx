'use client';

import React, { ChangeEvent, useState, useEffect } from 'react';
import {Todo, ToDoItemProps, ToDoListProps, AddToDoProps} from './defination'

function TodoItem({
	todo,
	toggleTodoCompletion,
	deleteTodo,
}: ToDoItemProps){
    const getBackgroundColor = () => {
		if (todo.completed) {
			return 'bg-gray-100'
		} else {
			return 'bg-blue-100'
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
    );
}

function ToDoList({
	todos,
	toggleTodoCompletion,
	deleteTodo,
}: ToDoListProps) {
	return (
		<ul>
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					toggleTodoCompletion={toggleTodoCompletion}
					deleteTodo={deleteTodo}
				/>
			))}
		</ul>
	)
}

export {TodoItem, ToDoList};
export type {Todo, ToDoListProps};

function AddToDo({
	// newTodoText,
	// setNewTodoText,
	addTodo,
}: AddToDoProps) {
// function AddToDo(addTodo: (text: string) => void) {
	const [newTodoText, setNewTodoText] = useState('')

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodoText(event.target.value)
	}

	const handleAddTodo = () => {
		addTodo(newTodoText);
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

export default function TodoApp() {
	const [todos, setTodos] = useState<Todo[]>([])

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

	const addTodo = (newTodoText: string) => {
		if (newTodoText.trim() !== '') {
			const newTodo: Todo = {
				id: crypto.randomUUID(),
				text: newTodoText,
				completed: false,
			}
			setTodos((prevTodos) => [...prevTodos, newTodo])
			// setNewTodoText('')
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
			<div className="flex justify-center">
				<div className="max-w-[800px] w-full px-4">
					<AddToDo
						// newTodoText={newTodoText}
						// setNewTodoText={setNewTodoText}
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