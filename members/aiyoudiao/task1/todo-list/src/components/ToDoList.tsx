import { useContext } from "react";
import Store from "../context";
import { TodoHeader } from "./Header";
import { StoreContextType } from "../interface";
import ToDoItem from "./ToDoItem";

export default function TodoList() {
  const { todoList } = useContext(Store) as StoreContextType;

  const header =
    todoList.length === 0 ? (
      <p className="ml-2 text-success">事项全部完成！</p>
    ) : (
      <TodoHeader>
        <span className="float-right mb-2 text-secondary">还有 <strong className="text-danger"><ins>{todoList.length}</ins></strong> 项等待完成。</span>
      </TodoHeader>
    );

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">
            {header}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul className="list-group">
              {todoList.map(todo => <ToDoItem todo={todo} />)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
