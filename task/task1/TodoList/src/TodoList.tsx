import TodoItem from "./TodoItem";
import { ListsInterface } from "./App";

interface TodoListProps {
  lists: ListsInterface[];
  onDelete: (item: string) => void;
}

const TodoList = (props: TodoListProps) => {
  const {
    lists,
    onDelete,
  } = props;

  return (
    <div className="todo-list">
      {
        lists.map((item, idx) => <TodoItem key={idx} item={item.item} onDelete={onDelete} />)
      }
    </div>
  );
};

export default TodoList;