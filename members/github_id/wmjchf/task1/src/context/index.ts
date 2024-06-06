import React from "react";

export enum Status {
  TODO,
  COMPLETED,
}
export interface IToDo {
  title: string;
  id: number;
  status: Status;
}
interface IContext {
  addToDo: (title: string) => void;
  delToDo: (id: number) => void;
  toggleToDo: (id: number) => void;
  todos: IToDo[];
}
const Context = React.createContext<IContext>({
  addToDo: () => {},
  delToDo: () => {},
  toggleToDo: () => {},
  todos: [],
});

export default Context;
