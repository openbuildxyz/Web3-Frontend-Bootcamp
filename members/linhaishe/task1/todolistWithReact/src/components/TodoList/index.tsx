import React, { useState, useRef, useEffect } from 'react';
import './index.scss';
import Header from '../Header';
import AddTodo from '../AddTodo';
import TodoItem from '../TodoItem';

function TodoList() {
  const generateID = () => {
    let result = '';
    const input_length = 5;
    const chars =
      '[@678^#(ABC,F3qr.sIJKN_+}{:OPQRghi)jDEklm:~noGH=2pL*$Mtuvwx<STU1>5VW`XYZa4bcd&efyz09]';
    for (let i = 0; i < input_length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  const sortList = (a: any, b: any) => {
    return a.isCompleted > b.isCompleted
      ? 1
      : b.isCompleted > a.isCompleted
      ? -1
      : 0;
  };
  const [todoList, setTodoList] = useState(
    [
      { id: 1, taskName: 'linhaishe text1', isCompleted: false },
      { id: 2, taskName: 'linhaishe text2', isCompleted: false },
      { id: 3, taskName: 'linhaishe text3', isCompleted: true },
      { id: 4, taskName: 'linhaishe text4', isCompleted: false },
      { id: 5, taskName: 'linhaishe text5', isCompleted: false },
      { id: 6, taskName: 'linhaishe text6', isCompleted: false },
    ].sort(sortList)
  );
  const [newTask, setNewTask] = useState('');

  const inputRef = useRef(null);
  const btnRef = useRef(null);

  const handleChange = (e: any) => {
    e.preventDefault();
    setNewTask(e.target.value);
    console.log(newTask);
  };
  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        // btnRef?.current?.click();
      }
    };
    // inputRef?.current?.addEventListener('keydown', listener);
    return () => {
      // inputRef?.current?.removeEventListener('keydown', listener);
    };
  }, []);

  const handleDelete = (id: number) => {
    setTodoList(todoList.filter((list) => list.id !== id));
  };

  const handleEdit = (content: any) => {
    setNewTask(content.taskName);
    // inputRef.current.value = content.taskName;
    // inputRef.current.focus();

    setTodoList(todoList.filter((list) => list.id !== content.id));
  };
  const handleDone = (status: any) => {
    status.isCompleted = true;
    setTodoList([...todoList.sort(sortList)]);
  };
  const addTask = () => {
    // if (inputRef.current.value !== '') {
    //   const task = {
    //     id: todoList.length === 0 ? 1 : generateID(),
    //     taskName: newTask,
    //     isCompleted: false,
    //   };
    //   setTodoList([...todoList, task].sort(sortList));
    //   setNewTask('');
    //   inputRef.current.value = '';
    //   inputRef.current.focus();
    // } else {
    //   alert(customeAlert());
    // }
  };
  const customeAlert = () => {
    const alertMsgs = [
      'Please type in something',
      "input can't be empty",
      'Invalid input',
      'something went wrong',
    ];
    const msgIndex = Math.floor(Math.random() * alertMsgs.length);
    const randomMsg = alertMsgs[msgIndex];

    return randomMsg;
  };

  return (
    <div className='todolist'>
      <Header />
      <AddTodo />
      <div className='lists'>
        {todoList.map((list, id) => (
          <TodoItem
            list={list}
            id={id}
            handleDone={handleDone}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
