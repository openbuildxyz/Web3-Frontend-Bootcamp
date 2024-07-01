/*
 * @Author: Jacket-mzl
 * @Date: 2024-06-04 16:55:08
 * @LastEditors: Jacket-mzl
 * @LastEditTime: 2024-06-14 23:21:00
 * @Description:
 */
import "./ToDoList.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import {
  setToDo,
  changeToDo as changeToDoStore,
  delToDo as deleteTodoStore,
} from "../../redux/modules/doThing";
import ToDoItem from "../ToDoItem/ToDoItem";
export default function ToDoList() {
  const toDoArr = useSelector((state: RootState) => state.toDoState.todoArr);
  const dispatch = useDispatch();
  const deleteTodo = (id: number) => {
    dispatch(deleteTodoStore(id));
  };
  const changeToDo = (id: number, stateToDo: boolean) => {
    dispatch(changeToDoStore({ id, stateToDo }));
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
              changeToDo={changeToDo}
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
