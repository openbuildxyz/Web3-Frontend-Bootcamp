
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import CreateIcon from '@mui/icons-material/Create';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import RedoIcon from '@mui/icons-material/Redo';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';


import { ToDoTask } from '../../types/todo'
import { useState } from 'react';

enum UpdateType {
  ADD = 'add',
  DELETE = 'delete',
  UPDATE = 'update',
  EDIT = 'edit',
  CANCEL = 'cancel',
  COMPLETED = 'completed'
}

interface Props {
  task: ToDoTask;
  updateTaskList: (type: UpdateType, task?: ToDoTask) => void;
}


interface ButtonGroupProps {
  task: ToDoTask;
  onSaveEditTask: (task: ToDoTask) => void;
  onCompletedTask: (task: ToDoTask) => void;
  onCancelEditTask: (task: ToDoTask) => void;
  onEditTask: (task: ToDoTask) => void;
  onDeleteTask: (task: ToDoTask) => void;
}

function ButtonGroup(props: ButtonGroupProps) {
  let btns: React.ReactElement = <></>
  if (props.task.isEditing) {
    btns = <>
      <Tooltip title="Save">
        <IconButton aria-label="comment" color="primary" onClick={() => props.onSaveEditTask(props.task)}>
          <SaveIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Cancel">
        <IconButton aria-label="comment" onClick={() => props.onCancelEditTask(props.task)}>
          <NotInterestedIcon />
        </IconButton>
      </Tooltip>
    </>
  } else if (props.task.completed) {
    btns = <>
      <Tooltip title="Redo">
        <IconButton aria-label="comment" onClick={() => props.onCompletedTask(props.task)}>
          <RedoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton aria-label="comment" color="error" onClick={() => props.onDeleteTask(props.task)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  } else {
    btns = <>
      <Tooltip title="Edit">
        <IconButton aria-label="comment" onClick={() => props.onEditTask(props.task)}>
          <CreateIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Done">
        <IconButton aria-label="comment" color="success" onClick={() => props.onCompletedTask(props.task)}>
          <DoneOutlineIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete" onClick={() => props.onDeleteTask(props.task)}>
        <IconButton aria-label="comment" color="error">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  }
  return btns
}

function ToDoItem(props: Props) {

  const [editTask, setEditTask] = useState<ToDoTask>()

  const onChangeEditTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTask({
      id: props.task.id,
      task: e.target.value,
      isEditing: props.task.isEditing,
      completed: props.task.completed
    })
  }

  const onEditTask = (task: ToDoTask) => {
    console.log({
      ...task,
      isEditing: true
    })
    setEditTask(task)
    props.updateTaskList( UpdateType.EDIT, task)
  }

  const onSaveEditTask = () => {
    console.log(editTask)
    if (editTask) {
      props.updateTaskList(UpdateType.UPDATE, editTask)
    }
  }

  const onCancelEditTask = () => {
    setEditTask(undefined)
    props.updateTaskList(UpdateType.CANCEL, editTask)
  }

  const onCompletedTask = (task: ToDoTask) => {
    console.log(props.task.id)
    props.updateTaskList(UpdateType.COMPLETED, {
      ...task,
      completed: !task.completed
    })
  }

  const onDeleteTask = (task: ToDoTask) => {
    setEditTask(undefined)
    props.updateTaskList(UpdateType.DELETE, task)
  }

  return (
    <ListItem
      key={props.task.id}
      disableGutters
      sx={{ pr: 18 }}
      secondaryAction={
        <ButtonGroup
          task={props.task}
          onEditTask={onEditTask}
          onSaveEditTask={onSaveEditTask}
          onCancelEditTask={onCancelEditTask}
          onCompletedTask={onCompletedTask}
          onDeleteTask={onDeleteTask} />
      }
    >
      {
        props.task.isEditing ?
        <TextField
          sx={{ ml: 1, flex: 1 }}
          value={editTask?.task}
          placeholder="Edit todo item"
          inputProps={{ 'aria-label': 'Edit todo item' }}
          onChange={onChangeEditTask}
          variant="standard" />
        :
        <ListItemText sx={{ color: props.task.completed ? 'rgb(117, 117, 117)': 'currentColor', textDecorationLine: props.task.completed ? 'line-through' : 'none'}} primary={`${props.task.task}`} />
      }
    </ListItem>
  )
}

export default ToDoItem
