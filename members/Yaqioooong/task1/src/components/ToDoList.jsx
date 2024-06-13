import React, {useState,useEffect} from "react";
import ToDoItem from "./ToDoItem.jsx";
import AddToDo from "./AddToDo.jsx";
import Header from "./Header.jsx";


function ToDoList() {
    const [todos, setTodos] = useState(()=>{
        return JSON.parse(localStorage.getItem("todos")) || [];
    });

    // 从localStorage加载数据
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = (todoText) => {
        const newTodo = {
            id: Date.now(),
            text: todoText,
            completed: false,
        };
        setTodos([...todos, newTodo]);
        localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
    };

    const handleToggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id===id?{...todo,completed: !todo.completed}:todo
            )
        );
    };

    const handleDeleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
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