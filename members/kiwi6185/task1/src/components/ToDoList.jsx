import React from "react"
import ToDoItem from "./ToDoItem"

function ToDoList({ items, onDelete, onToggleComplete }) {

  return (
    <div>
      <ul>
        {items.map((item) => (
          <ToDoItem key={item.id} item={item} onDelete={onDelete} onToggleComplete={onToggleComplete}/>
        ))}
      </ul>
    </div>
    
  )
}

export default ToDoList