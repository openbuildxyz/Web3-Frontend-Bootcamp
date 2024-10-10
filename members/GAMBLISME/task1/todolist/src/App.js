import {Component} from "react";
import Header from "./components/Header";
import List from "./components/List";
import Footer from "./components/Footer";


export default class App extends Component {

     state = {
        todos: [
            {id: 1, name: '吃饭', completed: false},
            {id: 2, name: '睡觉', completed: false},
            {id: 3, name: '学习', completed: false}
        ]
     }

     addTodo = (todoObj) => {
         let {todos} = this.state
         const newTodos = [todoObj, ...todos]
         this.setState({todos: newTodos})
     }

     updateTodo = (id, completed) => {
         let {todos} = this.state
         let newTodos = todos.map(todo => {
             if (todo.id === id) {
                 return {...todo, completed}
             } else {
                 return todo
             }
         })
         this.setState({todos: newTodos})
     }

     deleteTodo = (id) => {
         let {todos} = this.state
         let newTodos = todos.filter(todo => {
             return todo.id !== id
         })
         this.setState({todos: newTodos})
     }

     checkAllTodo = (completed) => {
         let {todos} = this.state
         let newTodos = todos.map(todo => {
             return {...todo, completed}
         })
         this.setState({todos: newTodos})
     }

     clearALLDone = () => {
         let {todos} = this.state
         let newTodos = todos.filter(todo => {
             return !todo.completed
         })
         this.setState({todos: newTodos})
     }




    render() {
        let { todos } = this.state
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header addTodo={this.addTodo} />
                    <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
                    <Footer todos={todos} checkAllTodo={this.checkAllTodo} clearALLDone={this.clearALLDone} />
                </div>
            </div>
        )
    }

}