import { TodoListDispatch } from "~/types";

import ToDoItem from "../ToDoItem";


const ToDoList = ({ todoList, onSetList }: TodoListDispatch) => {
  return (
    <ul className="p-0 flex flex-col items-center gap-1">
      {
        todoList?.map((item) => (
          <ToDoItem todoList={todoList} onSetList={onSetList} key={item.uuid} {...item} />
        ))
      }
    </ul>
  );
}

export default ToDoList
