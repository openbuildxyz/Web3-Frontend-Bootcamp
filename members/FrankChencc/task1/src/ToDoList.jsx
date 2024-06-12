import {useCallback, useState, useEffect} from 'react';
import {List, Button} from 'antd';
import Header from './Header';
import ToDoItem from './ToDoItem';
import AddToDo from './AddToDo'

function App() {
  // todo 项列表
  const [todos, setTodos] = useState([]);

  // 删除todo项
  const deleteTodo =useCallback((index) => {
    setTodos([...todos.filter((todo, i) => index !== i)]);
  }, [todos]);

  // 添加todo项
  const addTodo =useCallback((text) => {
    setTodos([...todos, {text, status: false}]);
  }, [todos]);

  // 改变todo项状态
  const changeStatus =useCallback((index) => {
    console.log(index);
    todos[index].status = !todos[index].status;
    console.log(todos);
    setTodos([...todos]);
  }, [todos]);


  // 从本地存储中获取待办事项
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // 保存待办事项到本地存储
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <List
      header={<Header />}
      footer={<AddToDo addTodo={addTodo} />}
      bordered
      dataSource={todos}
      renderItem={(item, index) => (
        <List.Item
          key={index}
          actions={[
            <Button key={index + 'change'} type="text" onClick={() => changeStatus(index)}>更改状态</Button>,
            <Button key={index + 'del'} type="text" danger onClick={() => deleteTodo(index)}>删除待办</Button>
          ]}
        >
           <ToDoItem todo={item} />
        </List.Item>
      )}
    />
  )
}

export default App
