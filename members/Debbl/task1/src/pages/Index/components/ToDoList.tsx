import ToDoItem from "./ToDoItem";
import type { List } from "~/types";

interface Props {
  list: List;
  handleDone: (id: number) => void;
  handleDel: (id: number) => void;
}

export default function TodoList({ list, handleDone, handleDel }: Props) {
  const sortedList = list.sort((a, b) => {
    if (a.done && !b.done) {
      return 1;
    }
    if (!a.done && b.done) {
      return -1;
    }
    return 0;
  });

  return (
    <ul>
      {sortedList.map((i) => (
        <ToDoItem
          key={i.id}
          item={i}
          handleDone={handleDone}
          handleDel={handleDel}
        />
      ))}
    </ul>
  );
}
