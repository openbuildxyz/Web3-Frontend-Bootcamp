import React from "react"
import ToDoItem from "./ToDoItem"

function ToDoList({ items, onDelete }) {

  return (
    <div>
      <ul>
        {items.map((item) => (
          <ToDoItem key={item.id} item={item} onDelete={onDelete} />
        ))}
      </ul>
    </div>
    
  )
}

export default ToDoList