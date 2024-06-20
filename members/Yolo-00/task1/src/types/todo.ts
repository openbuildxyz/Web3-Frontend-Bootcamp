export interface ToDoItemType {
    todo: string;
    id: number;
    state: boolean;
}

export interface ToDoHandlerType {
    handleComplete: (id: number) => void;
    handleDelete: (id: number) => void;
}