// src/types.ts

// 待办事项的类型定义
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }
  
  // AddToDo 组件的 props 类型定义
  export interface AddToDoProps {
    addTodo: (todo: Todo) => void;
  }
  
  // ToDoItem 组件的 props 类型定义
  export interface ToDoItemProps {
    todo: Todo;
    deleteTodo: (id: number) => void;
    toggleComplete: (id: number) => void;
  }
  
  // ToDoList 组件的 props 类型定义
  export interface ToDoListProps {
    todos: Todo[];
    deleteTodo: (id: number) => void;
    toggleComplete: (id: number) => void;
  }
  