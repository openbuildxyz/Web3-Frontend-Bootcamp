import { ITask } from "./types/tasks";

const LOCAL_STORAGE_KEY = "tasks";

const getTasksFromStorage = (): ITask[] => {
  if (typeof window === "undefined") return []; // 服务器端不做任何操作
  const tasks = localStorage.getItem(LOCAL_STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToStorage = (tasks: ITask[]) => {
  if (typeof window === "undefined") return; // 服务器端不做任何操作
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
};

export const getAllTodos = async (): Promise<ITask[]> => {
  return getTasksFromStorage();
};

export const addTodo = async (todo: ITask): Promise<ITask> => {
  const tasks = getTasksFromStorage();
  console.log('1111', tasks, todo)
  tasks.push(todo);
  saveTasksToStorage(tasks);
  console.log('2222', getTasksFromStorage())
  return todo;
};

export const editTodo = async (todo: ITask): Promise<ITask> => {
  const tasks = getTasksFromStorage();
  const index = tasks.findIndex(t => t.id === todo.id);
  if (index !== -1) {
    tasks[index] = todo;
    saveTasksToStorage(tasks);
  }
  return todo;
};

export const deleteTodo = async (id: string): Promise<void> => {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter(task => task.id !== id);
  saveTasksToStorage(tasks);
};
