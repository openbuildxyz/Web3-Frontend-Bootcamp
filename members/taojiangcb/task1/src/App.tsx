import React from 'react'
import './App.css'
import Header from './Header'
import TodoStore, { useCreateStore } from './store';
import AddToDo from './AddToDo';
import ToDoList from './ToDoList';
import { Card, CardContent, CardHeader } from '@mui/material';

function App() {
  // 轻 store 初始化
  const store = useCreateStore();
  return <div>
    <TodoStore.Provider value={store}>
      <Card sx={{ minWidth: 275 }}>
        <CardHeader title={<React.Fragment>
          <Header title="TODO List" />
          <AddToDo />
        </React.Fragment>} />
        <CardContent>
          <ToDoList />
        </CardContent>
      </Card>
    </TodoStore.Provider>
  </div>
}

export default App;
