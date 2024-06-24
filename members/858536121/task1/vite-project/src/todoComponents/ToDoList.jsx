import { useEffect } from "react";
import ToDoItem from "../todoComponents/ToDoItem";
export default function ({ todoList, onDoOK, onDel }) {
  return (
    <>
      {todoList.map((item, index) => {
        return (
          <div key={item.id}>
            <ToDoItem
              todoItem={item}
              index={index}
              onDoOK={onDoOK}
              onDel={onDel}
            />
          </div>
        );
      })}
    </>
  );
}
