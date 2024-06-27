function ToDoItem({ item, deleteItem, toggleComplete }) {
  return (
    <div>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => toggleComplete(item.id)}
      />
      <span>{item.title}</span>
      <button onClick={() => deleteItem(item.id)}>删除</button>
    </div>
  );
}

export default ToDoItem;
