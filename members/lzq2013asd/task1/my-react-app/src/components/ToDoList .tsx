import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import TodoItem from "./ToDoItem";
import AddTodo from "./AddToDo";
import "react-toastify/dist/ReactToastify.css";
const Mychild: React.FC = () => {
  type TodoType = {
    id: string;
    content: string | "";
    iscompleted: boolean;
  };

  const [todoList, setTodoList] = useState<TodoType[]>(
    localStorage.getItem("todoList")
      ? JSON.parse(localStorage.getItem("todoList")!)
      : []
  );

  if (todoList === null) {
    return <div>Loading todoList...</div>;
  }
  const [todoCount, setTodoCount] = useState<number>(0);
  const [uncompletedCount, setUncompletedCount] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    setTodoCount(todoList.length);
    setUncompletedCount(todoList.filter((todo) => !todo.iscompleted).length);
  }, [todoList]);

  const addTodo = (content: string) => {
    // 生成一个基于当前时间戳和随机数的唯一 ID
  const id = Date.now() + '-' + Math.floor(100000 + Math.random() * 9000000);
    setTodoList([...todoList, { id, content, iscompleted: false }]);
  };

  const toggleTodo = (id: string) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, iscompleted: !todo.iscompleted } : todo
      )
    );
  };

  const deleteData = (id: string) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AddTodo addTodoItem={addTodo} />
      <ul className="todo-list">
        {todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo}
            deleteData={deleteData}
          />
        ))}
      </ul>
      <div className="flex">
        <span>待办事项：{todoCount} 件</span>
        <span>未完成：{uncompletedCount}件</span>
        <span>已完成：{todoCount - uncompletedCount}件</span>
      </div>
    </div>
  );
};

export default function ToDoList() {
  return (
    <div>
      <Mychild />
    </div>
  );
}
