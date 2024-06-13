import { useState, useEffect } from 'react';
import Header from './Header';
import AddToDo from './AddToDo';
import ToDoList from './ToDoList';

function App() {
    const [todos, setTodos] = useState(() => {
        const localData = localStorage.getItem('todos');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addToDo = (text) => {
        const newToDo = { id: Date.now(), text, completed: false };
        setTodos([...todos, newToDo]);
    };

    const toggleToDo = (id) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteToDo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div>
            <Header />
            <AddToDo onAdd={addToDo} />
            <ToDoList items={todos} onToggle={toggleToDo} onDelete={deleteToDo} />
        </div>
    );
}

export default App;