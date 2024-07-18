import TodoItem from "./TodoItem";
import { todoItem } from "../App";

interface Props {
  todolist: todoItem[];
  handleDeleteItem: (id: number) => void;
  handleTodoFilled: (id: number) => void;
}

function TodoList({ todolist, handleDeleteItem, handleTodoFilled }: Props) {
  return (
    <>
      {todolist.map((item) => (
        <div key={item.id}>
          <TodoItem
            text={item.text}
            onClick={() => handleTodoFilled(item.id)}
            fullfilled={item.fullfilled}
          />
          <button onClick={() => handleDeleteItem(item.id)}>删除</button>
        </div>
      ))}
    </>
  );
}

export default TodoList;
