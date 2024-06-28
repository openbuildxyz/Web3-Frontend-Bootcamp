import { ToDoItemType } from "./App";
interface ToDoItemProps {
    todo: ToDoItemType;
    deleteTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
  }

  const ToDoItem: React.FC<ToDoItemProps> = ({ todo, deleteTodo, toggleTodo }) => {
    return (
    <div style={{display:"flex"}}>
        <span >
            <input type="checkbox"  onChange={() => toggleTodo(todo.id)} id={todo.id.toString()} checked={todo.completed} /> {todo.text}
        </span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
};

export default ToDoItem;
