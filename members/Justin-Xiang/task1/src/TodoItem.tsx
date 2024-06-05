export interface Todo {
  text: string;
  completed: boolean;
}
interface TodoItemProps {
  todo: Todo;
  index: number;
  toggleTodo: (index: number) => void;
  deleteTodo: (index: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  toggleTodo,
  deleteTodo,
}) => {
  return (
    <li
      style={{
        textDecoration: todo.completed ? "line-through" : "none",
        fontSize: "20px",
      }}
      onClick={() => toggleTodo(index)}
    >
      {todo.text}
      <button
        style={{ marginLeft: "10px" }}
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo(index);
        }}
      >
        删除
      </button>
    </li>
  );
};

export default TodoItem;
