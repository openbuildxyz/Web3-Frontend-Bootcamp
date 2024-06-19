
import React from 'react';


export default function ToDoItem({ todo, deleteTodoItem,toggleTodoItem }) {


    return <li>
         <input 
        type="checkbox"
        checked={todo.complete} 
        name={todo.title} 
        id={todo.id} 
        onClick={()=>toggleTodoItem(todo.id)}
        /> 
        <span>{todo.title}</span>
        <button onClick={()=>deleteTodoItem(todo.id)}>delete</button>
    </li>


}