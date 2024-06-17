import { Button } from "antd";
interface TodoItemProps {
  id: string;
  content: string;
  iscompleted: boolean;
  toggleTodo: (id: string) => void;
  deleteData: (id: string) => void;
}
import { toast } from "react-toastify";
const TodoItem: React.FC<TodoItemProps> = ({
  id,
  content,
  iscompleted,
  toggleTodo,
  deleteData,
}) => {
  return (
    <li className="todo-item flex">
      <Button
        onClick={() => {
          deleteData(id);
          toast.success("🦄" + "删除成功");
        }}
        type="primary"
        danger
      >
        删除
      </Button>
      <div className="todo-item-info" onClick={() => toggleTodo(id)}>
        <i className={iscompleted ? "iscompleted" : ""}>
          {iscompleted ? "任务已完成" : "任务未完成"}
        </i>
        <span>{content}</span>
      </div>
    </li>
  );
};

export default TodoItem;
