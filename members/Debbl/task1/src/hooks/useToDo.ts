import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import type { Item, List } from "~/types";

const LocalStorageKey = "todoList";

export function useToDo() {
  const [list, setList] = useState<List>(() => {
    const localList = localStorage.getItem(LocalStorageKey);
    return localList ? JSON.parse(localList) : [];
  });
  const [inputText, setInputText] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAdd = () => {
    if (inputText === "") {
      return;
    }

    const newItem: Item = {
      id: Date.now(),
      text: inputText,
      done: false,
    };

    setList([newItem, ...list]);
    setInputText("");
  };

  const handleDel = (id: number) => {
    const newList = list.filter((i) => i.id !== id);
    setList(newList);
  };

  const handleDone = (id: number) => {
    const newList = list.map((i) => {
      if (i.id === id) {
        return { ...i, done: !i.done };
      }
      return i;
    });

    setList(newList);
  };

  useEffect(() => {
    localStorage.setItem(LocalStorageKey, JSON.stringify(list));
  }, [list]);

  return {
    list,
    inputText,
    onChange,
    handleAdd,
    handleDel,
    handleDone,
  };
}
