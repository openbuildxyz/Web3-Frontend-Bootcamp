import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {

    state = { mouse: false }

    // 鼠标移入移除函数
    handleMouse = (flag) => {
        return () => {
            this.setState({ mouse: flag })
        }
    }

    // 用于勾选todo改变状态
    handleChange = (id) => {
        return (event) => {
            this.props.updateTodo(id, event.target.checked)
        }
    }

    // 删除某一数据的回调
    handleDelete = (id) => {
        if (window.confirm("确认删除吗？")) {
            this.props.deleteTodo(id)
        }
    }

    // 渲染组件
    render() {
        let { name, id, completed } = this.props
        let { mouse } = this.state
        return (
            <li style={{ background: mouse ? '#ddd' : '#fff' }} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
                <label>
                    <input type="checkbox" checked={completed} onChange={this.handleChange(id)}></input>
                    <span>{name}</span>
                </label>
                <button onClick={() => this.handleDelete(id)} className="btn btn-danger" style={{ display: mouse ? 'block' : 'none' }}>删除</button>
            </li>
        )
    }
}
