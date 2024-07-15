import ToDoItem from './ToDoItem';

interface PropsType {
  items : {
  id: number;
  content: string;
  isDone: boolean;
}[];
  toggleComplete: (params: number) => void;
  deleteTodo: (params: number) => void;
};

{/* ToDoList component: show all the things todo */}
const ToDoList = ({ items, toggleComplete, deleteTodo } : PropsType) => {
  return (
    <div>
      {items.map((item) => (
          <ToDoItem
            key={item.id}
            item={item}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
      ))}
    </div>
  );
};

export default ToDoList

