import "../App.css";

export interface TODOProps {
  completed: boolean;
  title: string;
}

interface Props {
  todo: TODOProps;
  index: number;
  toggleComplete: (index: number) => void;
  deleteTodo: (index: number) => void;
}

const ToDoItem = ({ todo, index, toggleComplete, deleteTodo }: Props) => {
  return (
    <div
      className="todo-item"
      style={{
        backgroundColor: todo.completed ? "gray" : "none",
      }}
    >
      <div className="todo-content" onClick={() => toggleComplete(index)}>
        <input
          type="checkbox"
          placeholder="添加待办事项"
          checked={todo.completed}
          readOnly
          className="todo-checkbox"
        />
        <span
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          className="todo-text"
        >
          {todo.title}
        </span>
      </div>
      <button onClick={() => deleteTodo(index)} className="delete-button">
        删除
      </button>
    </div>
  );
};

export default ToDoItem;
