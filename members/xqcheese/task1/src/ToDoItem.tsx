interface PropsType {
  item : {
  id: number;
  content: string;
  isDone: boolean;
};
  toggleComplete: (params: number) => void;
  deleteTodo: (params: number) => void;
};

{/* ToDoItem component: show single todo-item */}
const ToDoItem = ({ item, toggleComplete, deleteTodo }: PropsType) => {

  return (
    <div>
      <input type="checkbox" checked={item.isDone} onClick={() => toggleComplete(item.id)} onChange={() => toggleComplete(item.id)} />
        {item.content}
      <button onClick={() => deleteTodo(item.id)}>Delete</button>
    </div>
  );
};

export default ToDoItem

