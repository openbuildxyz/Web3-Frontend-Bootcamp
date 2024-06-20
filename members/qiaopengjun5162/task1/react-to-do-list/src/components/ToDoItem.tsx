import { FC } from 'react';
import classes from './ToDoItem.module.css';

// 定义 ToDoItem 组件的属性类型
interface ToDoItemProps {
  todo: string;
  id: string;
  completed: boolean;
  handleDelete: (id: string) => void;
  toggleToDo: (id: string) => void;
}

// ToDoItem 组件：展示单个待办事项。
const ToDoItem: FC<ToDoItemProps> = ({ todo, id, completed, handleDelete, toggleToDo }) => {
  console.log('ToDoItem rendered', { todo, id, completed, handleDelete, toggleToDo });

  // 删除待办事项：每个待办事项旁边有一个删除按钮，点击后可以删除该事项。
  const deleteHandler = () => {
    handleDelete(id);
  };

  // 切换待办事项状态：每个待办事项旁边有一个切换按钮，点击后可以切换该事项的状态（已完成或未完成）。
  const toggleHandler = () => {
    toggleToDo(id);
  };

  return (
    <div className={classes.item}>
      <span className={classes.todo} style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {todo}
      </span>
      <button className={classes.toggle} onClick={toggleHandler}>
        {completed ? '未完成' : '已完成'}
      </button>
      <button className={classes.delete} onClick={deleteHandler}>
        删除
      </button>
    </div>
  );
};

export default ToDoItem;
