export interface ToDo {
    id: number;
    content: string;
    completed: boolean;
}

export interface HeaderProps {
    title: string
}
``

export interface AddBtnPorps {
    submit: (value: string) => void;
}



export interface ItemProps {
    item: ToDo;
    toggleItem: (id: number) => void,
    deleteItem: (id: number) => void


}


export interface ListProps {
    list: ToDo[],
    toggleItem: (id: number) => void,
    deleteItem: (id: number) => void
}