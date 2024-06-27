import ToDoItem from "./ToDoItem";

function ToDoList({ items, onToggle, onDelete }) {
  return (
    <ul>
      {items.map((item) => (
        <ToDoItem
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default ToDoList;
