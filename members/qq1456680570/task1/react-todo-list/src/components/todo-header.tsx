import React from 'react'
import '../assets/style.scss'
type Props = {}
import logo from '../assets/react.svg'

export default function AddTodo({}: Props) {
  return (
    <div className='header'>
        <img src={logo} className='logo' alt="" />
        <h1>React Todo List</h1>
    </div>
  )
}