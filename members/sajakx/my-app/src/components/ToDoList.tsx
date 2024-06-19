
import ToDoItem from "./ToDoItem.tsx"
import React from 'react';

export default function ToDoList({ todoLists, deleteTodoItem,toggleTodoItem }) {

    return <ul>
        {
          todoLists&&   todoLists.map(todo => {
                return <ToDoItem
                 key={todo.id} 
                 todo={todo}
                 deleteTodoItem={deleteTodoItem}
                 toggleTodoItem={toggleTodoItem}
                 />
            })
        }
    </ul>


}