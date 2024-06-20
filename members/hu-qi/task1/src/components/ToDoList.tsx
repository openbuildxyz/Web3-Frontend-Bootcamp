// src/components/ToDoList.tsx

import TodoItem from "./ToDoItem";
import type { Props } from '../TodoList' 

function ToDoList({ todos, setTodos }: Props) {
    return (
      <ol className="todo_list">
        {todos && todos.length > 0 ? (
          todos?.map((item, index) => (
            <TodoItem key={index} item={item} todos={todos} setTodos={setTodos} />
          ))
        ) : (
          <li>Seems lonely in here, what are you up to?</li>
        )}
      </ol>
    );
  }

  export default ToDoList;