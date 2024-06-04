import ToDoItem from "./ToDoItem";

function ToDoList({ items, onDelete, onToggle }) {
  return (
    <ul>
      {items.map((item) => (
        <ToDoItem
          key={item.id}
          item={item}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

export default ToDoList;
