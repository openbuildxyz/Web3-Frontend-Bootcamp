import React from "react";
import ToDoItem from "../ToDoItem";
import "./index.css";

export default function ToDoList(props) {


    return (
        <>
            <ul className="todo-main">
                {
                    props.todos.map(item => {
                        return <ToDoItem key={item.id} item={item} deleteTodo={()=>props.deleteTodo(item.id)} updateTodo={props.updateTodo}/>
                    })
                }
            </ul>
        </>
    );
}


