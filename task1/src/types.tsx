export type ToDo = Omit<ToDoItemProps, 'handleRemove' | 'handleToggle'>;

export interface AddToDoProps {
  addToDo: (value: string) => void;
}

export interface ToDoListProps {
  toDoList: ToDo[],
  handleRemove: (id: number) => void;
  handleToggle: (id: number) => void;
}


export interface ToDoItemProps {
  id: number;
  completed: boolean;
  text: string;
  handleRemove: (id: number) => void;
  handleToggle: (id: number) => void;
}
