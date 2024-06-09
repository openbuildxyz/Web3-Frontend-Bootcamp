export interface  ToDoItem  {
    content:string,
    complated:boolean,
}

export interface TodoDataSave {
    save(todo: ToDoItem[]):boolean,
    list():ToDoItem[],
}