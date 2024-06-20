import { ChangeEvent, useState } from "react";
import { PlusIcon } from "../components/icons";
import { Button, Input } from "antd";
import { toast } from "react-toastify";

interface newProps {
  addTodoItem: (content: string) => void;
}

const AddTodo: React.FC<newProps> = ({ addTodoItem }) => {
  const [addToDoContent, setNewContent] = useState<string>("");

  const addTodo = () => {
    if (addToDoContent.trim()) {
      addTodoItem(addToDoContent);
      toast.success("🦄" + "新增待办事项成功");
      setNewContent("");
    }
  };
  const contentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContent(e.target.value);
  };

  return (
    <div className="flex">
      <Input
        value={addToDoContent}
        onChange={(e: ChangeEvent<HTMLInputElement>) => contentChange(e)}
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        placeholder="请输入新增待办事项..."
        type="text"
        prefix={
          <PlusIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        suffix={
          <Button type="primary" onClick={() => addTodo()}>
            新增待办
          </Button>
        }
      />
    </div>
  );
};

export default AddTodo;
