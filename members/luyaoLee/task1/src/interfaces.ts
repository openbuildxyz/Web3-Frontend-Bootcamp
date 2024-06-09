export interface Task {
  id: number;
  text: string;
  done: boolean;
}

export interface PropsEvent {
  onDelete: (task: Task) => void;
  onToggle: (task: Task) => void;
}
