import { Todo } from "./types/todo";

export const getTodos = (): Todo[] => {
  const data = localStorage.getItem("todos");
  if (data) return JSON.parse(data);
  return [];
};

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
