import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';

interface ToDo {
    id: number;
    text: string;
    isCompleted: boolean;
}

const App: React.FC = () => {
    const [todos, setTodos] = useState<ToDo[]>(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addToDo = (text: string) => {
        setTodos([...todos, { id: Date.now(), text, isCompleted: false }]);
    };

    const toggleToDo = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo));
    };

    const deleteToDo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div>
            <Header />
            <AddToDo onAdd={addToDo} />
            <ToDoList todos={todos} onToggle={toggleToDo} onDelete={deleteToDo} />
        </div>
    );
};

export default App;
