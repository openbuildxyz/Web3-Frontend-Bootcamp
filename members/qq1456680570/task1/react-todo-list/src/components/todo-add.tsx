import React, { useContext } from 'react'
import '../assets/style.scss'
import { useGlobal } from '../context'
interface Props {
}

export default function todoHeader({ }: Props) {
    const [inputText, setInputText] = React.useState('')
    const { handleAdd } = useGlobal()
    const addTodoFun = () => {
        if (inputText.trim()) {
            handleAdd(inputText)
            setInputText('')
        }
    }
    return (
        <div>

            <div className='add-todo'>
                <input
                    type="text"
                    className='todo-input'
                    placeholder='input the anything and press "Enter"'
                    value={inputText}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            addTodoFun()
                        }
                    }}
                    onChange={(e) => {
                        setInputText(e.currentTarget.value)
                    }}
                />
                {
                    inputText.trim() &&
                    <button className='todo-submit' onClick={() => {
                        addTodoFun()
                    }}>add</button>
                }
            </div>
        </div>
    )
}