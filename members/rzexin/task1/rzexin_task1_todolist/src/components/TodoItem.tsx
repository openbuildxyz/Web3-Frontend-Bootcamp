import { MdCheckBox } from "react-icons/md";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

interface ItemProps {
  id: number;
  text: string;
  isComplete: boolean;
  deleteTodoItem: (id: number) => void;
  toggle: (id: number) => void;
}

type TodoItem = {
  id: number;
  text: string;
  isComplete: boolean;
};

const TodoItem = ({
  id,
  text,
  isComplete,
  deleteTodoItem,
  toggle,
}: ItemProps) => {
  return (
    <div className="flex items-center m-3 gap-2">
      <div
        onClick={() => {
          toggle(id);
        }}
        className="flex flex-1 items-center cursor-pointer"
      >
        {isComplete ? (
          <MdCheckBox className="w-7 h-7 text-green-500" />
        ) : (
          <MdCheckBoxOutlineBlank className="w-7 h-7" />
        )}
        <p
          className={`text-blue-500 ml-2 text-lg decoration-slate-700 ${
            isComplete ? "line-through" : ""
          }`}
        >
          {text}
        </p>
      </div>

      <RiDeleteBin5Fill
        onClick={() => deleteTodoItem(id)}
        className="w-6 h-6 cursor-pointer text-slate-600"
      />
    </div>
  );
};

export default TodoItem;
