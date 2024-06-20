import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import { ToDoItemProp } from "./components/ToDoItem";
import ToDoList from "./components/ToDoList";
import AddToDo from "./components/AddToDo";

function App() {
    // Initialize state as an empty array
    const [todos, setTodos] = useState<ToDoItemProp[]>(() => {
        const localData = localStorage.getItem('todos');
        return localData ? JSON.parse(localData) : [];
    });

    // Save todos to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
        console.log("Saved todos:", todos);
    }, [todos]);

    const addTodo = (newTodo: ToDoItemProp) => {
        setTodos([...todos, newTodo]);
    };

    const onComplete = (id: number) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(newTodos);
    };

    const onDelete = (id: number) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };

    return (
        <div className="App">
            <div className="grid-paper">
                <Header></Header>
                <ToDoList todos={todos} onComplete={onComplete} onDelete={onDelete}></ToDoList>
                <AddToDo addTodo={addTodo}></AddToDo>
            </div>
        </div>
    );
}

export default App;
