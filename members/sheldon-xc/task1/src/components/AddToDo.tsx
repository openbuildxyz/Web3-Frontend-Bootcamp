
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
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
  updateTaskList: (type: UpdateType, task?: ToDoTask) => void;
}

function AddToDo(props: Props) {

  const [task, setTask] = useState("")

  const addTask = () => {
    const obj: ToDoTask = {
      id: Number(Math.random().toString().substr(2,3) + Date.now()).toString(36),
      task: task,
      isEditing: false,
      completed: false,
    };
    // toDoList.push (obj);
    setTask('')
    // setToDoList(toDoList)
    props.updateTaskList(UpdateType.ADD, obj)
  }

  const onChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value)
  }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={task}
        placeholder="Add todo item"
        inputProps={{ 'aria-label': 'Add todo item' }}
        onChange={onChangeTask}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{ p: '10px' }}
        aria-label="directions"
        disabled={task == ''}
        onClick={addTask}>
        <AddIcon />
      </IconButton>
    </Paper>
  )
}

export default AddToDo
