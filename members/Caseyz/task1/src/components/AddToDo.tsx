import React, { ChangeEvent, FormEvent, useState } from "react";

interface IProps {
  setDataList: (val: string) => void;
}

const AddToDo: React.FC<IProps> = ({ setDataList }) => {
  const [inputValue, setInputValue] = useState<string>();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    inputValue && setDataList(inputValue as string);
    setInputValue("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      ></input>
      <input type="submit" value="提交"></input>
    </form>
  );
};

export default AddToDo;
