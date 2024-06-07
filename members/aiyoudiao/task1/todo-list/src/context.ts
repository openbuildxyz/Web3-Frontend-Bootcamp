import React from "react";
import { StoreContextType } from "./interface";

const Store = React.createContext<StoreContextType>({
  todoList: ["学习技术", "学习业务", "学习管理"],
  dispatch: () => null,
});

export default Store;
