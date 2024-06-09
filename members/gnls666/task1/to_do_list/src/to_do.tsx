import React, { useState, useEffect } from "react";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

// TodoItem 组件
const TodoItem: React.FC<{
  todo: Todo;
  toggleTodo: (id: number) => void;
  isDelete: (id: number) => void;
}> = ({ todo, toggleTodo, isDelete }) => {
  const { id, task, completed } = todo;

  const handleTodoClick = () => {
    toggleTodo(id);
  };
  const handleDelete = () => {
    isDelete(id);
  };
  return (
    <li>
      <input type="checkbox" checked={completed} onChange={handleTodoClick} />
      {`${id}:${task}`}
      <button onClick={handleDelete}>删除</button>
    </li>
  );
};

// TodoList 组件
const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Array<Todo>>(() => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      return JSON.parse(todos);
    }
    return [];
  });
  const [newTodoTask, setNewTodoTask] = useState<string>("");
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const toggleTodo = (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };
  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
  };
  const handleNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTask(e.target.value);
  };
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTask.trim()) return;
    const newTodo: Todo = {
      id: new Date().getTime(),
      task: newTodoTask,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTodoTask("");
  };

  return (
    <div>
      <h1>待办事项</h1>
      <form>
        <input
          type="text"
          onChange={handleNewTodo}
          placeholder="增加一条待办事项"
        />
        <button type="submit" onClick={handleAdd}>
          增加
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            isDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
