export interface Todo {
  title: string;
  id: string;
  is_completed: boolean;
}

export interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export interface TodoItemProps {
  item: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}


export interface ToDoHeroProps {
  todos_completed: number;
  total_todos: number;
}

