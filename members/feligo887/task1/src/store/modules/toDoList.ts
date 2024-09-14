import { proxy, subscribe } from 'valtio'

export interface ToDoList {
    list: Array<{ isChecked: boolean, text: string }>
}

const loadState = () => {
    const toDoList = localStorage.getItem( 'toDoList' )
    return toDoList ? JSON.parse( toDoList ) : { list: [] }
}

// store
export const toDoList = proxy<ToDoList>( loadState() )

// 增加数据
export const addToDoList = ( text: string ) => {
    toDoList.list.push( {
        isChecked: false,
        text,
    } )
}
// 修改数据选中状态数据
export const changeToDoList = ( index: number ) => {
    const record = toDoList.list[ index ]
    record.isChecked = !record.isChecked
    toDoList.list[ index ] = record
}
// 删除数据
export const removeToDoList = ( index: number ) => {
    toDoList.list.splice( index, 1 )
}

subscribe( toDoList, () => {
    localStorage.setItem( 'toDoList', JSON.stringify( toDoList ) )
} )
