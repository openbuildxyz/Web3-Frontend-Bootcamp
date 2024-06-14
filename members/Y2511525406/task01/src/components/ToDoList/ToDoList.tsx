/*
 * @Author: Jacket-mzl
 * @Date: 2024-06-04 16:55:08
 * @LastEditors: Jacket-mzl
 * @LastEditTime: 2024-06-04 21:09:40
 * @Description:
 */
import "./ToDoList.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import {
  setToDo,
  doneToDo as doneToDoStore,
  delToDo as deleteTodoStore,
} from "../../redux/modules/doThing";
import ToDoItem from "../ToDoItem/ToDoItem";
export default function ToDoList() {
  const toDoArr = useSelector((state: RootState) => state.toDoState.todoArr);
  const dispatch = useDispatch();
  const deleteTodo = (id: number) => {
    console.log("我拿到的是什么", id);
    dispatch(deleteTodoStore(id));
  };
  const doneToDo = (id: number) => {
    dispatch(doneToDoStore(id));
  };
  return (
    <div className="todolist-contain">
      {toDoArr.length ? (
        toDoArr.map((item) => {
          return (
            <ToDoItem
              id={item.id}
              content={item.content}
              isDone={item.isDone}
              deleteTodo={deleteTodo}
              doneToDo={doneToDo}
              key={item.id}
            ></ToDoItem>
          );
        })
      ) : (
        <div className="todolist-noInfo">No information</div>
      )}
    </div>
  );
}
