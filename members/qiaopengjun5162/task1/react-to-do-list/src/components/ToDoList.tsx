import { FC, useCallback } from "react";
import ToDoItem from "./ToDoItem";
import classes from './ToDoList.module.css';

type ToDoListProps = {
  toDoList: { id: string; todo: string; completed: boolean }[];
  handleDelete: (id: string) => void;
  toggleToDo: (id: string) => void;
};

// ToDoList 组件：展示所有待办事项。
const ToDoList: FC<ToDoListProps> = ({ toDoList, handleDelete, toggleToDo }) => {
  // 使用 useCallback 优化函数，防止子组件不必要的重新渲染
  const handleDeleteCallback = useCallback((id: string) => {
    handleDelete(id);
  }, [handleDelete]);

  const toggleToDoCallback = useCallback((id: string) => {
    toggleToDo(id);
  }, [toggleToDo]);

  return (
    <div className={classes.todoList}>
      {/* 展示待办事项列表 */}
      <ul className={classes.todoListItems}>
        {toDoList.map((item) => (
          <ToDoItem
            key={item.id} // 使用唯一的 id 作为 key  
            todo={item.todo}
            id={item.id} // 传递 id 到 ToDoItem  
            completed={item.completed} // 传递 completed 状态
            handleDelete={handleDeleteCallback} // 传递删除函数
            toggleToDo={toggleToDoCallback} // 传递 toggleToDo 函数
          />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
