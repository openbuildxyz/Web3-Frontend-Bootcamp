import { useContext } from "react";
import Context from "../../context";
import { ToDoItem } from "../ToDoItem";

export const ToDoList = () => {
  const { todos } = useContext(Context);
  return (
    <div>
      {todos.map((item) => {
        return <ToDoItem key={item.id} item={item} />;
      })}
    </div>
  );
};
