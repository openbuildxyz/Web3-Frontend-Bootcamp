import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';
import './App.css';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>(() => {
        try {
            const savedTodos = localStorage.getItem('todos');
            return savedTodos ? JSON.parse(savedTodos) : [];
        } catch (e) {
            console.error('Failed to parse todos from localStorage', e);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('todos', JSON.stringify(todos));
        } catch (e) {
            console.error('Failed to save todos to localStorage', e);
        }
    }, [todos]);

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: Date.now(),
            text,
            completed: false,
        };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

    const deleteTodo = (id: number) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const toggleComplete = (id: number) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
        );
    };

    return (
        <div className='App'>
            <Header />
            <AddToDo addTodo={addTodo} />
            <ToDoList todos={todos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
        </div>
    );
};

export default App;
