import { useState } from "react";

interface ToDoItem {
  title: string;
  checked: boolean;
}

const useLocalStorage = (key: string) => {
   
  const storedValue: ToDoItem[] = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) || "")
    : [];

  const [List, setList] = useState<ToDoItem[]>(storedValue);
  const addToDoItem = (newValue: ToDoItem) => {
    const updatedList = getItemList();
    updatedList.push(newValue);
    setList(updatedList);
    localStorage.setItem(key, JSON.stringify(updatedList));
  
  };

  const getItemList = () => {
    return JSON.parse(localStorage.getItem(key) || "");
  };

  const updateTodoItem = (checked: boolean, index: number) => {
    const updatedList = getItemList();
    const item = updatedList[index];
    item.checked = checked;
    setList(updatedList);
    localStorage.setItem(key, JSON.stringify(updatedList));
   
  };


  const deleteTodoItem = ( index: number) => {
    const updatedList = getItemList();
    console.log('updatedList',updatedList,index);

    updatedList.splice(index, 1);
    setList(updatedList);
    localStorage.setItem(key, JSON.stringify(updatedList));
   
  };

  return [List, addToDoItem, updateTodoItem, getItemList,deleteTodoItem];
};

export default useLocalStorage;
