import React from "react";
import "@/TodoList.css";

interface Props {
  todoCount: number;
  uncompletedCount: number;
}

const Footer: React.FC<Props> = ({ todoCount, uncompletedCount }) => {
  return (
    <div className="todo-footer">
      <span>共 {todoCount} 件待办事项,未完成 { uncompletedCount} 件</span>
    </div>
  )
}

export default Footer;