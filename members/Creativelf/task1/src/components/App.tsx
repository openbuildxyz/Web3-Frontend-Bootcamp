import React, { useState, useEffect } from 'react';
import Header from './Header';
import ToDoList from './ToDoList';
import AddToDo from './AddToDo';
import '../App.css'; // 引入新的CSS文件

interface ToDo {
    id: number;
    text: string;
    completed: boolean;
}

const App: React.FC = () => {
    const [toDos, setToDos] = useState<ToDo[]>(() => {
        const savedToDos = localStorage.getItem('toDos');
        return savedToDos ? JSON.parse(savedToDos) : [];
    });

    useEffect(() => {
        localStorage.setItem('toDos', JSON.stringify(toDos));
    }, [toDos]);

    const addToDo = (text: string) => {
        const newToDo = { id: Date.now(), text, completed: false };
        setToDos([...toDos, newToDo]);
    };

    const deleteToDo = (id: number) => {
        setToDos(toDos.filter((todo) => todo.id !== id));
    };

    const toggleToDo = (id: number) => {
        setToDos(
            toDos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div>
            <Header />
            <AddToDo addToDo={addToDo} />
            <ToDoList toDos={toDos} deleteToDo={deleteToDo} toggleToDo={toggleToDo} />
        </div>
    );
};

export default App;
