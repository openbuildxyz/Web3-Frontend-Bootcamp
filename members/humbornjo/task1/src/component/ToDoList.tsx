import { Todo } from '../model/todo.ts'
import ToDoItem from './ToDoItem.tsx'


export default function ToDoList({ todos, onAction }: { todos: Todo[], onAction: (action: string, todo: Todo) => void }) {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <ToDoItem key={todo.id} data={todo} onAction={onAction} />
      ))}
    </div>
  );
}


