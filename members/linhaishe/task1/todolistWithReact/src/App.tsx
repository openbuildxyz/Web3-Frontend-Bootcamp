import { useState, useRef, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import TodoList from './components/TodoList';

function App() {
  return (
    <>
      <TodoList />
    </>
  );
}

export default App;
