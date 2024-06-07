import React, {useState} from "react";
import ToDoItem from "./ToDoItem.jsx";
import AddToDo from "./AddToDo.jsx";
import Header from "./Header.jsx";


function ToDoList() {
    const [todos, setTodos] = useState([]);
    const handleAddTodo = (todoText) => {
        const newTodo = {
            id: Date.now(),
            text: todoText,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };
    const handleToggleTodo = (id) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };
    const handleDeleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };
    return (
        <div className="todo-list">
            <Header/>
            <AddToDo onAddTodo={handleAddTodo} />
            <ul>
                {todos.map((todo) => (
                    <ToDoItem
                        key={todo.id}
                        todo={todo}
                        onToggleTodo={handleToggleTodo}
                        onDeleteTodo={handleDeleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
}
export default ToDoList;