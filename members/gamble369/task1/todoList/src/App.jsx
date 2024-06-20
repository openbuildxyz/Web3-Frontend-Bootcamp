import React,  { Component } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import List from './components/List'

export default class App extends Component {
  state = {todos: [
      {id: "001", name:"示例：吃饭", done: true}, 
  ]}

  addTodo = (todoObj) => {
    const {todos} = this.state
    const newTodos = [todoObj, ...todos]
    
    this.setState({todos: newTodos})
  }

  updateTodo = (id, done) => {
    const {todos} = this.state
    const newTodos = todos.map((todo) => {
      if(todo.id === id) return {...todo, done:done}
      else return todo
    })
    this.setState({todos: newTodos})
  }

  deleteTodo = (id) => {
    const {todos} = this.state
    const newTodos = todos.filter((todo) => { return todo.id !== id})
    this.setState({todos: newTodos})
  }

  checkAllTodos = (done) => {
    const {todos} = this.state
    const newTodos = todos.map((todo)=>{ return {...todo, done:done}})
    this.setState({todos: newTodos})
  }

  clearAllDone = () => {
    const {todos} = this.state
    const newTodos = todos.filter((todo)=>{ return !todo.done})
    this.setState({todos: newTodos})
  }

  render() {
    const {todos} = this.state
    const {updateTodo, deleteTodo, addTodo, checkAllTodos, clearAllDone} = this

    return (
      <div className="todo-container">
        <h1>To Do List</h1>
        <div className="todo-wrap">
          <Header addTodo={addTodo}/>
          <List todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
          <Footer todos={todos} checkAllTodos={checkAllTodos} clearAllDone={clearAllDone} />
        </div>
    </div>
    )
  }
}