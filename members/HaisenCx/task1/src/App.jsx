import React from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import ToDoList from './components/ToDoList';

function App() {
  return (
    <div className="to-do-list">
      <Header/>
      <ToDoList/>
      <Footer/>
    </div>
  );
}

export default App;