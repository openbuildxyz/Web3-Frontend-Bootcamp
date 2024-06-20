/*
 * @Author: Jason 373422363@qq.com
 * @Date: 2024-06-04 16:28:15
 * @LastEditors: Jason 373422363@qq.com
 * @LastEditTime: 2024-06-04 20:26:51
 * @FilePath: /Web3-Frontend-Bootcamp/members/github_id/JasonStu/task1/TodoList-vite/src/component/ToDoList.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { useEffect, useState } from "react";
import useLocalStorage from "../Tool/localStorage";
import ToDoItem from "./ToDoItem";
interface ToDoItem {
  title: string;
  checked: boolean;
}

const TodoList = (props: { list: ToDoItem[]; onListChange: () => void }) => {
  const [todoList, setTodoList] = useState<ToDoItem[]>(props.list);
  const [, , updateTodoItem, , deleteTodoItem] = useLocalStorage("list");
  useEffect(() => {
    setTodoList(props.list);
  }, [props.list]);

  return (
    <div style={{ minWidth: "250px", display: "flex", flexDirection: "column" }}>
      {todoList.map((item, index) => {
        return (
          <ToDoItem
          key={JSON.stringify(item) + index}
            item={item}
            onFinish={() => {
              updateTodoItem(!item.checked, index);
              props.onListChange();
            }}
            onDelete={() => {
              deleteTodoItem(index);
              props.onListChange();
            }}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
