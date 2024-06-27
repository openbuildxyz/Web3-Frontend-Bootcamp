import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];
        setTodos(storedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text: string) => {
        setTodos([...todos, { id: Date.now(), text, completed: false }]);
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    return (
        <div className="App">
            <Header />
            <AddToDo addTodo={addTodo} />
            <ToDoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
        </div>
    );
}

export default App;
