import React, {Component} from 'react'
import './index.css'
import { v4 as uuidv4 } from "uuid"
import PropTypes from "prop-types";

export default class Header extends Component {
    static propTypes = {
        addTodo: PropTypes.func.isRequired
    }

    handleKeyUp = (event) => {
        let {keyCode, target} = event;
        if (keyCode !== 13) return;
        if (target.value.trim() === '') {
            alert('请输入内容');
            return;
        }

        const todoObj = {
            id: uuidv4(),
            name: target.value,
            completed: false
        }

        this.props.addTodo(todoObj);
        target.value = '';
    }

    render() {
        return (
           <div className={"todo-header"}>
               <input onKeyUp={this.handleKeyUp} type={"text"} placeholder={"请输入你的任务名称，按回车键确认"} />
           </div>
        )
    }

}