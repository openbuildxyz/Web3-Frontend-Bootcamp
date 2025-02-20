import { FC, FormEvent, useRef } from "react";

interface TodoFormProps {
  handleAddTodoItem: (inputValue: string) => void;
}

const ToDoForm: FC<TodoFormProps> = ({ handleAddTodoItem }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleTodoSubmit = (event: FormEvent) => {
    event?.preventDefault();
    const inputValue = inputRef.current!.value;
    handleAddTodoItem(inputValue);
  };
  return (
    <form
      onSubmit={handleTodoSubmit}
      className="w-screen flex justify-center items-center"
    >
      <input
        type="text"
        name="input"
        placeholder="please type any text"
        className="m-2 p-2 border border-blue-300 rounded-xl"
        ref={inputRef}
      />
      <button
        className="m-2 p-2 rounded-xl bg-blue-400 font-bold text-white"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default ToDoForm;
