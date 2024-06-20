import React, { useState, useEffect } from 'react';
import Header from './Header';
import ToDoList from './ToDoList';
import AddToDo from './AddToDo';

function App() {
    const [todos, setTodos] = useState(() => {
        // 从本地存储获取待办事项列表
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    useEffect(() => {
        // 将待办事项列表保存到本地存储
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    function handleAddTodo(text) {
        const newTodo = { id: Date.now(), text: text, completed: false };
        setTodos([...todos, newTodo]);
    }

    function handleDeleteTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }


    function handleToggleCompleted(id) {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    }

    return (
        <div>
            <Header />
            <AddToDo onAdd={handleAddTodo} />
            <ToDoList
                todos={todos}
                onToggleCompleted={handleToggleCompleted}
                onDeleteTodo={handleDeleteTodo}
            />
        </div>
    );
}

export default App;
