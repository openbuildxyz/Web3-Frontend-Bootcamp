import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

function ToDoItem({ todo, todos, setTodos, index }) {
  const deleteTodo = () => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <li style={{ display: 'flex', alignItems: 'center' }}>
      <span
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={() => {
          const newTodos = [...todos];
          newTodos[index].completed = !newTodos[index].completed;
          setTodos(newTodos);
        }}
      >
        {todo.text}
      </span>
      {/* <Button onClick={deleteTodo}> */}
        <DeleteIcon style={{ marginLeft: '12px' }} onClick={deleteTodo}/>
      {/* </Button> */}
    </li>
  );
}

export default ToDoItem;
