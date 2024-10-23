import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {

    // 全选 checkbox 的回调
    handleCheckAll = (event) => {
        this.props.checkAllTodo(event.target.checked)
    }

    // 清空所有
    handleClearAllDone = () => {
        this.props.clearALLDone()
    }

    render() {
        const { todos } = this.props
        // 已完成个数
        const doneTotal = todos.reduce((pre, todo) => pre + (todo.completed ? 1 : 0), 0)
        // 总数
        const totol = todos.length
        return (
            <div className="todo-footer">
                <label>
                    <input type="checkbox" onChange={this.handleCheckAll} checked={totol === doneTotal && totol !== 0 ? true : false} />
                </label>
                <span>
          <span>已完成 {doneTotal} </span> / 全部 {totol}
        </span>
                <button onClick={this.handleClearAllDone} className="btn btn-danger">清楚已选择任务</button>
            </div>
        )
    }
}
