import { PropsEvent, Task } from "../../interfaces";
import ToDoItem from "../ToDoItem";

interface IProps extends PropsEvent {
  tasks: Task[];
}

const ToDoList: React.FC<IProps> = ({ tasks, onDelete, onToggle }) => {
  return (
    <div>
      {tasks.map((task) => {
        return (
          <ToDoItem
            task={task}
            key={task.id}
            onDelete={onDelete}
            onToggle={onToggle}
          ></ToDoItem>
        );
      })}
    </div>
  );
};

export default ToDoList;
