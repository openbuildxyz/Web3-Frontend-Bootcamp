import ToDoItem from "./ToDoItem";

type ToDo = {
  text: string;
  completed: boolean;
};
interface ToDoListProps {
  toDos: ToDo[];
  deleteTodo: (index: number) => void;
  toggleComplete: (index: number) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({
  toDos,
  deleteTodo,
  toggleComplete,
}) => {
  return (
    <ul className="w-full flex flex-col gap-2 mt-5">
      {toDos.map((toDo, index: number) => (
        <ToDoItem
          key={index}
          index={index}
          toDo={toDo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
  );
};

export default ToDoList;
