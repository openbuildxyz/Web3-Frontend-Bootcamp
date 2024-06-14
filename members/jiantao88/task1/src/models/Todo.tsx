export interface ToDoListProps {
  todo: TodoType;
  todos?: TodoType[];
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}
export interface TodoType {
  id: string;
  text: string;
  completed: boolean;
}
