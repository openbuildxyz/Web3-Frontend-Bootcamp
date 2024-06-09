import classNames from "classnames";
import { PropsEvent, Task } from "../../interfaces";
import "./index.css";

interface IProps extends PropsEvent {
  task: Task;
}

const ToDoItem: React.FC<IProps> = ({ task, onDelete, onToggle }) => {
  const itemClass = classNames(["task-item", { done: task.done }]);

  return (
    <>
      <div className={itemClass}>
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task)}
        />
        <div className="task-text">{task.text} </div>
        <button className="delete-btn" onClick={() => onDelete(task)}>
          delete
        </button>
      </div>
    </>
  );
};

export default ToDoItem;
