
import React from "react";

import ToDoItem from "./ToDoItem";


// ToDoList组件：展示待办事项列表

function ToDoList({todos, deleteTodo,toggleCompleted}){
    return (
        <ul>
            {todos.map((todo, index)=>(
                <ToDoItem
                    key={index}
                    todo={todo}
                    deleteTodo={()=>deleteTodo(index)}
                    toggleCompleted={()=>toggleCompleted(index)}
                />
            ))}
        </ul>
    )
}

export default ToDoList;
