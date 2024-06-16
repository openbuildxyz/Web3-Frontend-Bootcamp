import { ListsInterface } from "./App";

interface TodoItemProps {
  item: ListsInterface;
  onDelete: (item: ListsInterface) => void;
  onComplete: (item: ListsInterface, status: boolean) => void;
}

const TodoItem = (props: TodoItemProps) => {
  const {
    item,
    onDelete,
    onComplete,
  } = props;

  const _onCheck = (e: React.ChangeEvent<HTMLInputElement>, item: ListsInterface) => {
    onComplete(item, e.target.checked);
  };

  const itemClassName = !item.completed ? "todo-item_show" : "todo-item_show completed";

  return (
    <div className="todo-item">
      <div className={itemClassName}>
        <input className="todo-item_checkbox" checked={item.completed} type="checkbox" onClick={(e) => { _onCheck(e, item) }} />
        <span className="todo-item_text">{item.item}</span>
      </div>
      <button className="todo-item_btn" onClick={ () => { onDelete(item) } }>删除</button>
    </div>
  );
};

export default TodoItem;