import React, { Component } from 'react'
import "./index.css"

export default class Footer extends Component {
  
  handleCheckAll = (event) =>{
    console.log(event.target.checked)
    this.props.checkAllTodos(event.target.checked)
  }

  handleClear = () => {
    this.props.clearAllDone()
  }

  render() {
    const {todos} = this.props
    const doneCount = todos.reduce((pre, todo)=>{return pre+(todo.done? 1: 0)}, 0)
    const total = todos.length

    return (
      <div>
        <div className="todo-footer">
        <label> <input type="checkbox" onChange={this.handleCheckAll} checked={doneCount === total && total !== 0 ? true: false} /> </label>
        <span>
          <span>已完成{doneCount}</span> / 全部{total}
        </span>
        <button onClick={this.handleClear} className="btn btn-danger">清除已完成任务</button>
      </div>
      </div>
    )
  }
}
