'use client'
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import AddToDo from '../components/AddToDo';
import TodoList from '../components/TodoList';
import { todoListItem } from "@/types";

const defaultData = [
  { id: 1, name: 'React To-Do-List', complete: true },
  { id: 2, name: 'Blockchain Basic', complete: false },
  { id: 3, name: 'NFTMarket Contract', complete: false },
  { id: 4, name: 'NFTMarket Components', complete: false },
  { id: 5, name: 'NFTMarket Dapp', complete: false },
  { id: 6, name: 'Uniswap SDK', complete: false },
  { id: 7, name: 'web3小工具实践', complete: false },
]

export default function Example() {
  const [content, setContent] = useState('');
  const [todoList, setTodoList] = useState<todoListItem[]>(defaultData);

  useEffect(() => {
    const data = getInitialTodoList();
    if(data.length>1) setTodoList(data);
  }, [])

  const getInitialTodoList = (): todoListItem[] => {
    try {
      const storedTodos = localStorage.getItem('todos');
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error('Error retrieving todos from local storage:', error);
      return [];
    }
  };

  const handleAddTodo = () => {
    const newData = [...todoList, { id: Date.now(), name: content, complete: false }];
    setTodoList(newData);
    localStorage.setItem('todos', JSON.stringify(newData));
  }

  const handleContentChange = (value: any) => {
    setContent(value);
  }

  const handleStatusChange = (index: number) => {
    const item = todoList[index];
    item.complete = !item.complete;
    const newData = [...todoList];
    newData[index] = item;
    setTodoList(newData);
    localStorage.setItem('todos', JSON.stringify(newData));
  }

  const handleDelete = (index: number) => {
    const updatedItems = [...todoList]; 
    updatedItems.splice(index, 1); 
    setTodoList(updatedItems); 
    localStorage.setItem('todos', JSON.stringify(updatedItems));
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              To-do List
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Experience the simplicity of turning your plans into actions with our to-do application.
            </p>
          </div>
          <AddToDo content={content} handleContentChange={handleContentChange} handleAddTodo={handleAddTodo}/>
          <TodoList data={todoList} handleStatusChange={handleStatusChange} handleDelete={handleDelete} />
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-24rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-48rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-300 to-blue-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  )
}

