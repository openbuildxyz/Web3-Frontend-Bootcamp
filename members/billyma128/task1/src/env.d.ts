/// <reference types="@rsbuild/core/types" />

// just for quick reference, anti-pattern to avoid in real world applications

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoActions {
  addTodo: (todo: Todo) => void;

  toggleTodo: (id: number) => void;

  deleteTodo: (id: number) => void;

}
