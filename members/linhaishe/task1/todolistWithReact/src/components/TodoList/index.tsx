import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import Header from '../Header';
import AddTodo from '../AddTodo';
import TodoItem from '../TodoItem';
import { IList } from '../../type';
import { generateID, sortList } from '../../utils';

import './index.scss';

const getStoredTasks = (): IList[] => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    try {
      const parsedTasks = JSON.parse(storedTasks);
      if (Array.isArray(parsedTasks) && parsedTasks.length > 0) {
        return parsedTasks;
      } else {
        console.error('Stored tasks is not an array');
      }
    } catch (error) {
      console.error('Error parsing stored tasks:', error);
    }
  }
  return [];
};

function TodoList() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [newTask, setNewTask] = useState('');
  const [todoList, setTodoList] = useState<IList[]>(getStoredTasks);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewTask(e.target.value);
  };

  const handleDelete = (id: number | string) => {
    setTodoList(todoList.filter((list) => list.id !== id));
  };

  const handleRevert = (status: IList) => {
    status.isCompleted = false;
    setTodoList([...todoList.sort(sortList)]);
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

  useEffect(() => {
    // 将任务列表保存到本地存储
    localStorage.setItem('tasks', JSON.stringify(todoList));
  }, [todoList]);

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
            handleRevert={handleRevert}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
