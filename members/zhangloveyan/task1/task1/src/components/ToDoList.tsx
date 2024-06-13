import TodoItem from "./ToDoItem";

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

function TodoList({ todos, onToggleTodo, onDeleteTodo }: TodoListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id}
        todo = {todo}
        isCompleted = {todo.isCompleted}
        onToggle={onToggleTodo}
        onDelete={onDeleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
