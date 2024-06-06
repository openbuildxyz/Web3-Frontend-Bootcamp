import { useState } from 'react';
import { Todo } from '../model/todo.ts'

export default function ToDoItme({ todo, onDel }: { todo: Todo, onDel: (id: number) => void }) {
  const [done, setDone] = useState(false)

  const handleDelete = () => {
    onDel(todo.id)
  }

  return (
    <div className="todo-item">
      <h2 className="todo-title">{todo.title}</h2>
      <p className={`todo-description ${!todo.description ? 'placeholder' : ''}`}>
        {todo.description || "No description provided"}
      </p>
      <button onClick={() => {
        setDone(!done)
      }} style={{ backgroundColor: done ? "#acd793" : "#ff9eaa" }}>{done ? "done" : "pending"}</button>
      <button onClick={handleDelete} style={{ backgroundColor: "#eee" }}>delete</button>
      <div className="todo-timestamps">
        <p className="todo-create-time">
          <strong>created:</strong> {todo.create_time.toLocaleString()}
        </p>
        <p className="todo-update-time">
          <strong>updated:</strong> {todo.update_time.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
