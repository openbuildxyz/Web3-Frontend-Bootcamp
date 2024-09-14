import { Checkbox } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'

// store
import { useSnapshot } from 'valtio'
import store from '../../store'
import { removeToDoList, changeToDoList } from '../../store/modules/toDoList.ts'
// style
import style from './style.module.css'
// type
import type { ToDoList } from '../../store/modules/toDoList.ts'

const ToDoItem = ( props: { item: ToDoList['list'][0], index: number } ) => {
    const { item, index } = props
    return (
        <li className={ `${ style[ 'to-do-item' ] } ${ item.isChecked ? style.check : '' }` } key={ item.text }>
            <Checkbox checked={ item.isChecked } onClick={ () => changeToDoList( index ) }/>
            <span>{ item.text }</span>
            <DeleteForever onClick={ () => removeToDoList( index ) }/>
        </li>
    )
}

const ToDoList = () => {
    const snapshot = useSnapshot( store )
    const { toDoList } = snapshot
    return (
        <ul>
            {
                toDoList.list.map( ( item, index ) => {
                    return (
                        <ToDoItem key={ index } item={ item } index={ index }/>
                    )
                } )
            }
        </ul>
    )
}

export default ToDoList
