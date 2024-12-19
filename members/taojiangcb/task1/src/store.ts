import React, { PropsWithChildren, useContext, useMemo } from "react";
const LOCAL_STORE_KEY = "todo-list";

export interface Todo {
  id: string;
  text: string;
  done: boolean;
}

export type WithStoreChildProps = PropsWithChildren & {
  store: ITodoStore
}

export interface ITodoStore {
  data: readonly Todo[],
  setData: (data: Todo[]) => void
}

/**
 * 构建一个基本的 store 包括 data 和 setData 能力
 * @returns a store object with data and setData
 */
export const useCreateStore = (/** initialData */) => {
  const [todos, setTodos] = React.useState<Todo[]>(() => {
    const json_str = localStorage.getItem(LOCAL_STORE_KEY);
    const todos = JSON.parse(json_str || '[]');
    return todos;
  });

  const store = useMemo(() => {
    function toSaveLocal(todos: Todo[]) {
      localStorage.setItem(LOCAL_STORE_KEY, JSON.stringify(todos || []));
    }

    function setData(todos: Todo[]) {
      setTodos(todos) // 更新数据
      toSaveLocal(todos); // 保存到本地
    }

    return {
      data: Object.freeze(todos), // 冻结数据，只能通过 setData 更新数据
      setData
    }
  }, [todos]);
  return store;
}

export function withStore(Component: React.ComponentType<any>) {
  return function WithStore(props: any) {
    const store = useContext(TodoStore);
    return React.createElement(Component, { ...props, store });
  }
}

const TodoStore = React.createContext<ITodoStore>({
  data: [],
  setData: () => { }
})

export default TodoStore