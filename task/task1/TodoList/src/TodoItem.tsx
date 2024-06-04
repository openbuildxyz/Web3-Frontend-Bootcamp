interface TodoItemProps {
  item: string;
  onDelete: (item: string) => void;
}

const TodoItem = (props: TodoItemProps) => {
  const {
    item,
    onDelete
  } = props;

  return (
    <div className="todo-item">
      <div className="todo-item_show">
        <input className="todo-item_checkbox" type="checkbox" />
        <span className="todo-item_text">{item}</span>
      </div>
      <button className="todo-item_btn" onClick={ () => { onDelete(item) } }>删除</button>
    </div>
  );
};

export default TodoItem;