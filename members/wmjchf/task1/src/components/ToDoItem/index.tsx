import { Checkbox } from "antd";
import classNames from "classnames";
import Context, { IToDo, Status } from "../../context";
import { useContext } from "react";
interface IToDoItem {
  item: IToDo;
}
export const ToDoItem = (props: IToDoItem) => {
  const { item } = props;
  const { toggleToDo, delToDo } = useContext(Context);
  return (
    <div className="flex">
      <Checkbox
        value={item.status === Status.COMPLETED}
        onChange={() => {
          toggleToDo(item.id);
        }}
      ></Checkbox>
      <span
        className={classNames(
          "ml-2",
          item.status === Status.COMPLETED ? "line-through" : ""
        )}
      >
        {item.title}
      </span>
      <span
        className="text-red-500 ml-2 cursor-pointer"
        onClick={() => {
          delToDo(item.id);
        }}
      >
        删除
      </span>
    </div>
  );
};
