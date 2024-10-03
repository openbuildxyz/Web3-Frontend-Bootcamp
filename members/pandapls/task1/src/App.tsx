import { useEffect, useState } from 'react';
import './App.css';
import AddTodo from './components/AddTodo';
import Header from './components/Header';
import TodoList from './components/TodoList';

interface Todo {
	id: number;
	text: string;
	completed: boolean;
}

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);

	useEffect(() => {
		const localTodos = sessionStorage.getItem('todos');

		if (localTodos) {
			setTodos(JSON.parse(localTodos));
		}
	}, []);

	useEffect(() => {
		sessionStorage.setItem('todos', JSON.stringify(todos));
	}, [todos])

	const addTodo = (text: string) => {
		const newTodo: Todo = { id: Date.now(), text, completed: false };
		setTodos([...todos, newTodo]);
	};


	const deleteTodo = (id: number) => {
		setTodos(todos.filter(todo => todo.id !== id));
	};

	const toggleComplete = (id: number) => {
		setTodos(
			todos.map(todo =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};


	return <div>
		<Header />
		<AddTodo addTodo={addTodo} />
		<TodoList todos={todos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
	</div>;
}

export default App;
