
import List from '@mui/material/List';
import ToDoItem from './ToDoItem'
import { ToDoTask } from '../../types/todo'

enum UpdateType {
  ADD = 'add',
  DELETE = 'delete',
  UPDATE = 'update',
  EDIT = 'edit',
  CANCEL = 'cancel',
  COMPLETED = 'completed'
}

interface Props {
  toDoList: ToDoTask[],
  updateTaskList: (type: UpdateType, task?: ToDoTask) => void
}

function ToDoList(props: Props) {

  return (
    <List sx={{ width: '100%' }}>
      {props.toDoList.map((value) => (
        <ToDoItem
          key={value.id}
          task={value}
          updateTaskList={props.updateTaskList}/>
      ))}
    </List>

  )
}

export default ToDoList
