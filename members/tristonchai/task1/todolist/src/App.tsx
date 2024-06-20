import React, {FC} from "react";
import './index.css';
import './App.css';
import Header from './Components/Header';
import ToDoList from './Components/ToDoList';
// import { useState } from 'react';

const App: FC = () => {

  return (
    <div className="App">
      <Header/>
      <ToDoList/>
    </div>
  )
}

export default App
