import { useState, useEffect } from "react";
import { ToDoEntity } from "../interfaces";
import { parseLocalStorage } from "../utils";

export function useTodoList() {
  const [list, setList] = useState<ToDoEntity[]>([]);

  // 初次从 localStorage 加载数据
  useEffect(() => {
    const localList: ToDoEntity[] = parseLocalStorage();
    setList(localList);
  }, []);

  return [list, setList] as const;
}
