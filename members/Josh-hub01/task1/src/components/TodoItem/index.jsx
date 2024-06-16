import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

import styles from "./index.module.scss";

export default function TodoItem(props) {
  const { todo, todos, setTodos } = props;

  const deleteTodoList = (event) => {
    event.stopPropagation();
    setTodos(todos.filter((item) => item.id !== todo.id));
  };
  const handleClickTodoItem = () => {
    todo.status = todo.status === 0 ? 1 : 0;
    setTodos([...todos]);
  };

  return (
    <div className={styles.item} onClick={handleClickTodoItem}>
      <div>
        <span>{todo.title}</span>
        <Button variant="text">{todo.status === 0 ? "未完成" : "已完成✅"}</Button>
      </div>
      <IconButton edge="end" aria-label="delete">
        <DeleteIcon onClick={deleteTodoList} />
      </IconButton>
    </div>
  );
}
