import  { useState } from "react";
import { Input, Button } from "antd";

interface AddToDoProps {
  onAdd: (value: string) => void;
}

// 添加新的待办事项
const AddToDo = (props: AddToDoProps) => {
  const { onAdd } = props;
  const [todoThing, setTodoThing] = useState("");
  return (
    <div className="addToDoBody">
      <Input
        style={{
          width: "400px",
        }}
        value={todoThing}
        onChange={(v) => setTodoThing(v.currentTarget.value)}
        placeholder="请输入代办事项"
      />
      <Button
        type="primary"
        style={{
          marginLeft: "12px",
        }}
        onClick={() => {
          onAdd(todoThing);
          setTodoThing("");
        }}
      >
        添加代办
      </Button>
    </div>
  );
};

export default AddToDo;
