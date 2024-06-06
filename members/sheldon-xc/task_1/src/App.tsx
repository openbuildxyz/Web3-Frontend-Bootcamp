import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';

import Header from './components/Header';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';

import { ToDoTask } from '../types/todo'

import { useState, useEffect } from 'react';

interface Props {
  window?: () => Window;
  children?: React.ReactElement;
}

enum UpdateType {
  ADD = 'add',
  DELETE = 'delete',
  UPDATE = 'update',
  EDIT = 'edit',
  CANCEL = 'cancel',
  COMPLETED = 'completed'
}

function ScrollTop(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function App(props: Props) {
  const localStorageTodoList = localStorage.getItem('toDoList')
  const storedTodoList = localStorageTodoList ? JSON.parse(localStorageTodoList) : [];
  const defaultTodoList = storedTodoList.map((task: ToDoTask) => {
    // task.isEditing = false
    return {
      ...task,
      isEditing: false
    }
  })
  const [toDoList, setToDoList] = useState<ToDoTask[]>(defaultTodoList)

  useEffect(() => {
    localStorage.getItem('toDoList') && setToDoList(JSON.parse(localStorage.getItem('toDoList') || ''));
  },[])

  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
  }, [toDoList]);

  const updateTaskList = (type: UpdateType, editTask?: ToDoTask) => {

    let newTaskList: ToDoTask[] = []
    if ([UpdateType.EDIT, UpdateType.UPDATE, UpdateType.CANCEL, UpdateType.EDIT, UpdateType.COMPLETED].includes(type)) {
      newTaskList = toDoList.map((task) => {
        console.log(task)
        if (type === UpdateType.EDIT) {
          if (editTask && editTask.id === task.id) {
            task.isEditing = true;
          } else {
            task.isEditing = false;
          }
        }
        if (type === UpdateType.UPDATE) {
          if (editTask && editTask.id === task.id) {
            task.task = editTask.task;
          }
          task.isEditing = false
        }
        if (type === UpdateType.CANCEL) {
          task.isEditing = false;
        }
        if (type === UpdateType.COMPLETED) {
          if (editTask && editTask.id === task.id) {
            task.completed = editTask.completed;
          }
        }
        return task
      })
    }
    if (type === UpdateType.DELETE && editTask) {
      newTaskList = toDoList.filter((task) =>  {
        task.isEditing = false;
        return task.id != editTask.id
      })
    }
    if (type === UpdateType.ADD && editTask) {
      newTaskList = [...toDoList, editTask]
    }
    setToDoList(newTaskList);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Toolbar id="back-to-top-anchor" />
      <Container>
        <Box sx={{ my: 2 }}>
          <AddToDo updateTaskList={updateTaskList}/>
          <ToDoList toDoList={toDoList} updateTaskList={updateTaskList}/>
        </Box>
      </Container>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}

export default App
