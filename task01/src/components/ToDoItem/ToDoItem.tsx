/*
 * @Author: Jacket-mzl
 * @Date: 2024-06-04 17:51:40
 * @LastEditors: Jacket-mzl
 * @LastEditTime: 2024-06-04 21:16:22
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
  doneToDo: (id: number) => void;
}

export default function ToDoItem(props: ToDoItemType) {
  const [visible, setVisible] = useState(false);
  const handleOk = () => {
    props.deleteTodo(props.id);
    setVisible(false);
  };
  return (
    <div className="todoItem-main">
      <div className="todoItem-checkbox">
        <Checkbox checked={props.isDone} disabled={false}></Checkbox>
      </div>
      <div className="todoItem-content">{props.content}</div>
      <div className="todoItem-btn">
        <span onClick={() => setVisible(true)}>×</span>
        <span
          onClick={() => props.doneToDo(props.id)}
          style={props.isDone ? { display: "none" } : {}}
        >
          √
        </span>
      </div>
      <Modal
        title="Tip"
        open={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <p>Are you sure you want to delete?</p>
      </Modal>
    </div>
  );
}
