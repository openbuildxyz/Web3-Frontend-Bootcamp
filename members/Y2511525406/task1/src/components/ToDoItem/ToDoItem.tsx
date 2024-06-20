/*
 * @Author: Jacket-mzl
 * @Date: 2024-06-04 17:51:40
 * @LastEditors: Jacket-mzl
 * @LastEditTime: 2024-06-14 23:31:22
 * @Description:
 */
import { Checkbox, Modal } from "antd";
import { useEffect, useState } from "react";
import "./ToDoItem.css";

export interface ToDoItemType {
  id: number;
  content: string;
  isDone: boolean;
  deleteTodo: (id: number) => void;
  changeToDo: (id: number, stateToDo: boolean) => void;
}

export default function ToDoItem(props: ToDoItemType) {
  const [visible, setVisible] = useState(false);
  const deleteToDoItem = () => {
    props.deleteTodo(props.id);
    setVisible(false);
  };
  return (
    <div className="todoItem-main">
      <div className="todoItem-checkbox">
        <Checkbox
          checked={props.isDone}
          onClick={() => props.changeToDo(props.id, !props.isDone)}
        ></Checkbox>
      </div>
      <div className={`todoItem-content ${props.isDone ? "todo-done" : ""}`}>
        {props.content}
      </div>
      <div className="todoItem-btn">
        <span onClick={() => setVisible(true)}>×</span>
        {/* <span
          onClick={() => props.changeToDo(props.id, true)}
          style={props.isDone ? { display: "none" } : {}}
        >
          √
        </span> */}
      </div>
      <Modal
        title="Tip"
        open={visible}
        onOk={deleteToDoItem}
        onCancel={() => setVisible(false)}
      >
        <p>Are you sure you want to delete?</p>
      </Modal>
    </div>
  );
}
