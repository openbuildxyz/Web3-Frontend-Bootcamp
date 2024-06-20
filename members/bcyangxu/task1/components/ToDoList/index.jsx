import ToDoItem from "../ToDoItem"
import style from './index.module.css'

const ToDoList = (props) => {
    const { data, onDelToDo, onUpdate } = props

    return <div className={style.container}>
        <div className={style.list}>
            {
                data.map((item) => {
                    return <ToDoItem 
                                item={item} 
                                key={item.id} 
                                onDelToDo={onDelToDo}
                                onUpdate={onUpdate}
                            />
                })
            }
        </div>
    </div>
}

export default ToDoList