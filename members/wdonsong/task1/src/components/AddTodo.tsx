import { useRef, useState } from "react";

interface Props {
  handleAddTodo: (text: string) => void;
}
function AddTodo({ handleAddTodo }: Props) {
  const [showInput, setShowInput] = useState(false);
  const handleShowInput = () => setShowInput(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickConfirm = () => {
    inputRef.current && handleAddTodo(inputRef.current?.value);
    setShowInput(false);
  };

  return (
    <>
      {!showInput && <button onClick={() => handleShowInput()}>添加</button>}
      {showInput && (
        <div>
          <input type="text" ref={inputRef} />
          <button onClick={() => handleClickConfirm()}>确定</button>
        </div>
      )}
    </>
  );
}

export default AddTodo;
