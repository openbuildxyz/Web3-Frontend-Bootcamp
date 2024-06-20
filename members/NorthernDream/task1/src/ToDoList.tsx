import ToDoItem from "./ToDoItem";

const ToDoList = ({
  list,
  onDeleteItem,
  onSwitchCompleteItem
}: ToDoListProps) => {
  return (
    <>
      {list.map((i) => (
        <ToDoItem
          key={i.key}
          item={i}
          onDeleteItem={onDeleteItem}
          onSwitchCompleteItem={onSwitchCompleteItem}
        />
      ))}
    </>
  );
};

export default ToDoList;
