import Header from './components/Header';
import TodoList from './components/ToDoList';
import AddToDo from './components/AddToDo';
import ToDoItem, { Todo } from './components/ToDoItem';
import { useEffect, useState } from 'react';

type TodoMap = Map<number, Todo>;

const STORAGE_KEY = 'todo_list';

function App() {
  const [todoMap, setTodoMap] = useState<TodoMap>();

  useEffect(() => {
    setTodoMap(() => {
      return loadMapFromLocalStorage(STORAGE_KEY);
    });
  }, []);

  useEffect(() => {
    if (!todoMap) return;
    saveMapToLocalStorage(STORAGE_KEY, todoMap);
  }, [todoMap]);

  // 添加任务
  const handleAdd = (text: string) => {
    const todo = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    setTodoMap((preMap) => new Map(preMap).set(todo.id, todo));
  };

  // 根据id删除代办
  const deleteTodoById = (id: number) => {
    if (!id) return;
    setTodoMap((preMap) => {
      const newMap = new Map(preMap);
      newMap.delete(id);
      return newMap;
    });
  };

  // 根据id切换代办状态
  const toggleStatuById = (id: number) => {
    if (!id) return;
    setTodoMap((preMap) => {
      const newMap = new Map(preMap);
      const todo = newMap.get(id);
      if (todo) {
        newMap.set(id, {
          ...todo,
          completed: !todo.completed,
        });
      }
      return newMap;
    });
  };

  // 保存Map到本地存储
  const saveMapToLocalStorage = (key: string, map: TodoMap) => {
    const mapArray = Array.from(map.entries());
    const mapString = JSON.stringify(mapArray);
    localStorage.setItem(key, mapString);
  };

  // 从本地存储加载Map
  const loadMapFromLocalStorage = (key: string) => {
    const mapString = localStorage.getItem(key);
    if (mapString) {
      const mapArray = JSON.parse(mapString);
      const map = new Map(mapArray);
      return map;
    } else {
      return new Map();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-800 flex flex-col items-center justify-center">
      <div className="bg-white dark:bg-zinc-700 shadow-lg rounded-lg p-4 w-full sm:w-2/5">
        <Header title="Todo List" />
        <AddToDo onAddToDo={handleAdd} />
        <TodoList>
          {todoMap &&
            Array.from(todoMap.values()).map((item, index) => {
              return (
                <ToDoItem
                  key={index}
                  todo={item}
                  onDelete={deleteTodoById}
                  onToggle={toggleStatuById}
                />
              );
            })}
        </TodoList>
      </div>
    </div>
  );
}

export default App;
