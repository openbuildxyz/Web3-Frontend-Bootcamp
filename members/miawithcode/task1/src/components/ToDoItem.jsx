import { MinusIcon } from "@heroicons/react/24/outline";

const ToDoItem = ({ id, label, isDone, toggleItem, deleteItem }) => {
  return (
    <li className="flex w-full items-center justify-between border-b border-gray-100 p-2">
      <label className="w-full cursor-pointer">
        <input
          type="checkbox"
          checked={isDone}
          className="mr-2"
          onChange={() => toggleItem(id)}
        />
        {label}
      </label>
      <button className="cursor-pointer" onClick={() => deleteItem(id)}>
        <MinusIcon
          width={24}
          height={24}
          className="text-black/40 hover:text-black"
        />
      </button>
    </li>
  );
};

export default ToDoItem;
