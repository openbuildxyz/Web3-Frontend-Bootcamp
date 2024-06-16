import { FC, useState } from 'react'
interface AddToDoProps {
    onSubmit: (data: string) => void
}
const AddToDo: FC<AddToDoProps> = (props) => {
    const { onSubmit } = props
    const [inputValue, setInputValue] = useState('');
    return <div>
        <input
            placeholder='请输入代办事项'
            value={inputValue}
            onChange={(e) => {
                setInputValue(e.target.value)
            }}
        />
        <button
            style={{
                marginLeft: 6
            }}
            onClick={() => {
                onSubmit(inputValue)
                setInputValue('')
            }}>
            确定
        </button>
    </div>
}

export default AddToDo;