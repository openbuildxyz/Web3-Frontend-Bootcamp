interface AddToDoProps {
  onAddTODO: (value: string) => void;
}

interface ToDoListDTO {
  key: number;
  value: string;
  complete: boolean;
}

interface ToDoListProps  {
  list: ToDoListDTO[];
  onSwitchCompleteItem: (key: number, complete: boolean) => void;
  onDeleteItem: (key: number) => void;
}

interface ToDoItemProps {
  item: ToDoListDTO;
  onSwitchCompleteItem: (key: number, complete: boolean) => void;
  onDeleteItem: (key: number) => void;
}
