import { useContext } from "react";
import Store from "../context";
import { StoreContextType, TodoItemProps } from "../interface";

export default function ToDoItem({ todo }: TodoItemProps) {
  const { dispatch } = useContext(Store) as StoreContextType;
  return (
    <li key={todo} className="list-group-item">
      {todo}
      <button
        className="float-right btn btn-success btn-sm"
        style={{ marginLeft: 10 }}
        onClick={() => dispatch({ type: "COMPLETE", payload: todo })}
      >
        完成
      </button>
    </li>
  );
}
