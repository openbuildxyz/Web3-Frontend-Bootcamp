import { FC } from "react";
import { CloseOutlined } from "@ant-design/icons";

type ToDoItemProps = {
  id: string;
  text: string;
  handleDeleteTodoItem: (todoId: string) => void;
};

const ToDoItem: FC<ToDoItemProps> = ({ text, id, handleDeleteTodoItem }) => {
  return (
    <div className="w-64 px-4 py-2 flex justify-between items-center font-bold">
      {text}
      <CloseOutlined onClick={() => handleDeleteTodoItem(id)} />
    </div>
  );
};

export default ToDoItem;
