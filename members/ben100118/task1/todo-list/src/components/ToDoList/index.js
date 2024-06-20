import React from "react";
import ToDoItem from "../ToDoItem";
const ToDoList = ({todos,changeDone,deleteTodo}) => {
    return(
        <div className="todo-main">
            <ul>
                {todos.map((todo) =>
                (
                    <ToDoItem 
                    todo={todo}
                    key={todo.id}
                    changeDone={changeDone}
                    deleteTodo={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    )
} 

export default ToDoList