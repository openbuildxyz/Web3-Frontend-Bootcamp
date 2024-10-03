import { FC } from "react";
import TodoItem from "./TodoItem";
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
interface TodoListProps {
  todos: Todo[],
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
}
const TodoList: FC<TodoListProps> = (props) => {
  const {
    todos = [{ id: 1, text: '1', completed: false }],
    deleteTodo,
    toggleComplete
  } = props
  return (
    <div>
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
      ))}
    </div>
  )
}

export default TodoList
