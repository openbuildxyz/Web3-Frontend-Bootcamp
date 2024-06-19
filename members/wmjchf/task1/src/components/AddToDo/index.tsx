import { useState, useContext } from "react";
import { Button, Input } from "antd";
import Context from "../../context";

export const AddToDO = () => {
  const { addToDo } = useContext(Context);
  const [value, setValue] = useState("");

  const changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleAddToDO = () => {
    addToDo(value);
    setValue("");
  };

  return (
    <div className="flex py-2">
      <Input onChange={changeText} value={value} placeholder="请添加" />
      <Button className="ml-2" onClick={handleAddToDO}>
        添加
      </Button>
    </div>
  );
};
