import { ToDoItemType, ToDoHandlerType } from "../../types/todo";
import "./index.css";

type ToDoProps = ToDoItemType & ToDoHandlerType;

function ToDoItem({
  todo,
  id,
  state,
  handleComplete,
  handleDelete,
}: ToDoProps) {
  const handleDeleteTodo = () => {
    handleDelete(id);
  };
  const handleCompleteTodo = () => {
    handleComplete(id);
  };
  return (
    <>
      <li className={state ? "text-with-line" : ""}>
        {todo}
        <button style={{ marginLeft: 20 }} onClick={() => handleCompleteTodo()}>
          {!state ? "完成待办" : "恢复待办"}
        </button>
        <button style={{ marginLeft: 20 }} onClick={() => handleDeleteTodo()}>
          删除
        </button>
      </li>
    </>
  );
}

export default ToDoItem;
