import { useEffect, useState } from 'react';
import AddTodo from './AddTodo';
import TodoItem, { Todo } from './TodoItem';

const TODO_LIST_STORAGE_KEY = 'todoList';

function TodoList() {
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    const todoList = localStorage.getItem(TODO_LIST_STORAGE_KEY);
    return todoList ? JSON.parse(todoList) : [];
  });

  // 存储到 localStorage
  useEffect(() => {
    localStorage.setItem(TODO_LIST_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  function handleAdd(text: string) {
    setTodoList([...todoList, { id: Date.now(), text, done: false }]);
  }

  function handleToggle(id: number) {
    setTodoList(
      todoList.map(todo => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      })
    );
  }

  function handleDelete(id: number) {
    setTodoList(todoList.filter(todo => todo.id !== id));
  }

  return (
    <main className='mt-4'>
      <AddTodo onAdd={handleAdd} />
      <ul className='space-y-2 mt-4'>
        {todoList.length ? (
          todoList.map(todo => TodoItem({ todo, onToggle: handleToggle, onDelete: handleDelete }))
        ) : (
          <div className='flex justify-center text-gray-400'>No todos yet!</div>
        )}
      </ul>
    </main>
  );
}

export default TodoList;
