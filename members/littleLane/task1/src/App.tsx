import styles from "./App.module.less";
import Header from "./components/Header";
import AddToDo from "./components/AddToDo";
import ToDoList from "./components/ToDoList";
import { useCallback } from "react";
import { ToDoEntity } from "./interfaces";
import { useTodoList } from "./hooks/useTodoList";
import { parseLocalStorage, setLocalStorage } from "./utils";

function App() {
  const [list, setList] = useTodoList();

  // 添加待办事项
  const onAddTodo = useCallback(
    (name: string) => {
      const localList: ToDoEntity[] = parseLocalStorage();

      if (localList.find((todo) => todo.name === name)) {
        alert(`已存在名称为 '${name}' 的待办事项！`);
        return false;
      }

      localList.push({ name });
      setLocalStorage(localList);
      setList(localList);
      return true;
    },
    [setList]
  );

  // 删除待办事项
  const onDeleteTodo = useCallback(
    (name: string) => {
      const localList: ToDoEntity[] = parseLocalStorage();
      const todoIndex = localList.findIndex((todo) => todo.name === name);

      if (todoIndex >= 0) {
        localList.splice(todoIndex, 1);
        setLocalStorage(localList);
        setList(localList);
      }
    },
    [setList]
  );

  // 标记完成
  const onFinish = useCallback(
    (name: string) => {
      const localList: ToDoEntity[] = parseLocalStorage();
      const todo = localList.find((todo) => todo.name === name);

      if (todo) {
        todo.isFinished = !todo.isFinished;
        setLocalStorage(localList);
        setList(localList);
      }
    },
    [setList]
  );

  return (
    <div className={styles.app}>
      <Header />
      <AddToDo onAddTodo={onAddTodo} />
      <ToDoList list={list} onDeleteTodo={onDeleteTodo} onFinish={onFinish} />
    </div>
  );
}

export default App;
