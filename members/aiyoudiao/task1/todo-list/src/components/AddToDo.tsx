import { useContext, useState, ChangeEvent, KeyboardEvent } from "react";
import Store from "../context";
import { StoreContextType } from "../interface";


export default function TodoForm() {
  const { dispatch } = useContext(Store) as StoreContextType;

  const [todo, setTodo] = useState<string>("");

  function handleTodoChange(e: ChangeEvent<HTMLInputElement>) {
    setTodo(e.target.value);
  }

  function handleTodoAdd() {
    if (todo.trim()) {
      dispatch({ type: "ADD_TODO", payload: todo });
      setTodo("");
    }
  }

  function handleSubmitForm(event: KeyboardEvent<HTMLInputElement>) {
    if (event.code === "Enter") handleTodoAdd();
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <br />
        <div className="input-group">
          <input
            className="form-control"
            value={todo}
            autoFocus={true}
            placeholder="请输入新的事项"
            onKeyUp={handleSubmitForm}
            onChange={handleTodoChange}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={handleTodoAdd}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
