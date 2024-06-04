import ToDoItem from "./ToDoItem";

const ToDoList = ({ items, toggleItem, deleteItem }) => {
  return (
    <ul className="w-full">
      {items.length === 0 && (
        <p className="p-2 text-center text-black/40">No todos yet...</p>
      )}
      {items.map((item) => (
        <ToDoItem
          key={item.id}
          {...item}
          toggleItem={toggleItem}
          deleteItem={deleteItem}
        />
      ))}
    </ul>
  );
};

export default ToDoList;
