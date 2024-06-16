import { useEffect, useMemo, useState } from 'react';
import { TodoItem } from '../type';
import { getSafeStorage } from '../utils/storageUtils';

const useTodo = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const key = 'todoItems';

  useEffect(() => {
    const storagedValue = getSafeStorage('local', key);
    if (storagedValue == null) {
      return;
    }
    const todoItems = JSON.parse(storagedValue);
    if (todoItems) {
      setTodoItems(todoItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(todoItems));
  }, [todoItems]);

  const addTodo = (title: string) => {
    setTodoItems([...todoItems, { id: Date.now(), title, completed: false }]);
  };

  const deleteTodo = (id: TodoItem['id']) => {
    setTodoItems(todoItems.filter((todo) => todo.id !== id));
  };

  const toggleCompletion = (id: TodoItem['id']) => {
    setTodoItems([
      ...todoItems.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    ]);
  };
  const sortedTodoItems = useMemo(() => {
    const newTodoItems = todoItems.slice();
    newTodoItems.sort((a, b) => {
      if ((a.completed && b.completed) || (!a.completed && !b.completed)) {
        return 0;
      }
      if (!a.completed && b.completed) {
        return 1;
      }
      if (a.completed && !b.completed) {
        return -1;
      }
      return 0;
    });
    return newTodoItems;
  }, [todoItems]);
  return {
    todoItems: sortedTodoItems,
    addTodo,
    deleteTodo,
    toggleCompletion,
  };
};
export { useTodo };
