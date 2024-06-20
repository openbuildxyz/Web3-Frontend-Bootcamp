/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { Layout, Row, Col } from "antd";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import AddToDo from "./components/AddToDo";
import { TodoType } from "./models/Todo";

const { Content } = Layout;

const App = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: any) => {
    const newTodo = { id: Date.now().toString(), text, completed: false }; // 将 id 转换为字符串类型
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, []);

  const deleteTodo = useCallback((id: any) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id: any) => {
    setTodos((prevTodos: TodoType[]) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Content style={{ padding: "50px" }}>
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12} xl={8}>
            <AddToDo addTodo={addTodo} />
            <ToDoList
              todos={todos}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
              todo={todos[0]}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default App;
