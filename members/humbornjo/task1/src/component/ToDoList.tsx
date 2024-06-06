import { Todos } from '../model/todo.ts'
import ToDoItem from './ToDoItem.tsx'


export default function ToDoList({ todos, onDel }: { todos: Todos, onDel: (id: number) => void }) {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <ToDoItem key={todo.id} todo={todo} onDel={onDel} />
      ))}
    </div>
  );
}


