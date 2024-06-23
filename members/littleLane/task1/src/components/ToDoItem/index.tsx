import { useCallback } from "react";
import type { ToDoEntity } from "../../interfaces";
import styles from "./index.module.less";

interface ToDoItemProps {
  todo: ToDoEntity;
  onDeleteTodo: (name: string) => void;
  onFinish: (name: string) => void;
}

export default function ToDoItem({
  todo,
  onDeleteTodo,
  onFinish,
}: ToDoItemProps) {
  // 点击待办事项标记其为已完成或未完成
  const onTodoClick = useCallback(() => {
    onFinish(todo.name);
  }, [onFinish, todo.name]);

  // 点击待办事项进行删除
  const onTodoDelete = useCallback(() => {
    onDeleteTodo(todo.name);
  }, [onDeleteTodo, todo.name]);

  return (
    <li className={styles.todo} onClick={onTodoClick}>
      <span className={todo.isFinished ? styles["is-finished"] : ""}>
        {todo.name}
      </span>
      <span className={styles.del} onClick={onTodoDelete}>
        x
      </span>
    </li>
  );
}
