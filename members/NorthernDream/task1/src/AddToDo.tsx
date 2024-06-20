import { useState } from "react";

const AddToDo = ({ onAddTODO }: AddToDoProps) => {
  const [value, setValue] = useState<string>("");

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && value) {
          onAddTODO(value)
          setValue("")
        }
      }}
    />
  );
};

export default AddToDo;
