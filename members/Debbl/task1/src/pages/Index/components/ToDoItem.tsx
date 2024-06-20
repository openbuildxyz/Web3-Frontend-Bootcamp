import type { MouseEventHandler } from "react";
import { cn } from "twl";
import type { Item } from "~/types";

interface Props {
  item: Item;
  handleDone: (id: number) => void;
  handleDel: (id: number) => void;
}

export default function ToDoItem({ item, handleDone, handleDel }: Props) {
  const { id, text } = item;

  const onDelClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    handleDel(id);
  };

  return (
    <li
      className={cn(
        "flex justify-between cursor-pointer items-center gap-x-4 w-full",
      )}
      onClick={() => handleDone(id)}
    >
      <span className={cn(item.done && "line-through")}>{text}</span>
      <button onClick={onDelClick}>Del</button>
    </li>
  );
}
