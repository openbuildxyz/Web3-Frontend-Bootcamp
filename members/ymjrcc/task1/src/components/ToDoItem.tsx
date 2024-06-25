type ToggleCompleteFunction = (id: number) => void;

function ToDoItem({ todo, toggleComplete, removeToDo }: { todo: any, toggleComplete: ToggleCompleteFunction, removeToDo: any }) {
  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      <span onClick={() => toggleComplete(todo.id)} style={{marginRight: 10, cursor: 'pointer'}}>
        {todo.text}
      </span>
      <button onClick={() => removeToDo(todo.id)}>Delete</button>
    </li>
  );
}

export default ToDoItem;
