import { useAtomValue } from "jotai";

import { todoListAtom } from "~/store";

import ToDoItem from "../ToDoItem";

const ToDoList = () => {
  const todoList = useAtomValue(todoListAtom);

  return (
    <ul className="p-0 flex flex-col items-center gap-1">
      {
        todoList?.map((item) => (
          <ToDoItem key={item.uuid} {...item} />
        ))
      }
    </ul>
  );
}

export default ToDoList
