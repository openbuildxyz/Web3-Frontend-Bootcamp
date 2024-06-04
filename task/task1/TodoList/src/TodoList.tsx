import TodoItem from "./TodoItem";
import { ListsInterface } from "./App";

interface TodoListProps {
  lists: ListsInterface[];
  onDelete: (item: ListsInterface) => void;
  onComplete: (item: ListsInterface, status: boolean) => void;
}

const TodoList = (props: TodoListProps) => {
  const {
    lists,
    onDelete,
    onComplete,
  } = props;

  return (
    <div className="todo-list">
      {
        lists.map((item, idx) => <TodoItem key={idx} item={item} onDelete={onDelete} onComplete={onComplete} />)
      }
    </div>
  );
};

export default TodoList;