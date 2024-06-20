import { ToDoItemType, ToDoHandlerType } from "../../types/todo";
import ToDoItem from "../ToDoItem";

interface ToDoListProps extends ToDoHandlerType {
  todoList: ToDoItemType[];
}

function ToDoList({ todoList, handleComplete, handleDelete }: ToDoListProps) {
  return (
    <>
      <ul>
        {todoList.map((item) => (
          <ToDoItem
            key={item.id}
            todo={item.todo}
            id={item.id}
            state={item.state}
            handleComplete={handleComplete}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </>
  );
}

export default ToDoList;
