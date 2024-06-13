import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import Header from '../Header';
import AddTodo from '../AddTodo';
import TodoItem from '../TodoItem';
import { IList } from '../../type';
import { generateID, sortList } from '../../utils';

import './index.scss';

function TodoList() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [newTask, setNewTask] = useState('');
  const [todoList, setTodoList] = useState<IList[]>(
    [
      { id: 1, taskName: 'linhaishe text1', isCompleted: false },
      { id: 2, taskName: 'linhaishe text2', isCompleted: false },
      { id: 3, taskName: 'linhaishe text3', isCompleted: true },
      { id: 4, taskName: 'linhaishe text4', isCompleted: false },
      { id: 5, taskName: 'linhaishe text5', isCompleted: false },
      { id: 6, taskName: 'linhaishe text6', isCompleted: false },
    ].sort(sortList)
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewTask(e.target.value);
    console.log(newTask);
  };

  const handleDelete = (id: number | string) => {
    setTodoList(todoList.filter((list) => list.id !== id));
  };

  const handleDone = (status: IList) => {
    status.isCompleted = true;
    setTodoList([...todoList.sort(sortList)]);
  };

  const addTask = () => {
    if (!inputRef?.current) {
      return;
    }

    if (inputRef.current.value !== '') {
      const task = {
        id: todoList.length === 0 ? 1 : generateID(),
        taskName: newTask,
        isCompleted: false,
      };
      setTodoList([...todoList, task].sort(sortList));
      setNewTask('');
      inputRef.current.value = '';
      inputRef.current.focus();
    } else {
      alert(customAlert());
    }
  };

  const customAlert = () => {
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

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        btnRef?.current?.click();
      }
    };
    inputRef?.current?.addEventListener('keydown', listener);
    return () => {
      inputRef?.current?.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <div className='todolist'>
      <Header />
      <AddTodo
        inputRef={inputRef}
        handleChange={handleChange}
        btnRef={btnRef}
        addTask={addTask}
      />
      <div className='lists'>
        {todoList.map((list, id) => (
          <TodoItem
            list={list}
            id={id}
            handleDone={handleDone}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
