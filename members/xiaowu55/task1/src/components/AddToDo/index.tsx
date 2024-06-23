import { Dispatch, useState } from "react"

const AddToDo = ({ addItemHandle }: { addItemHandle: Dispatch<string> }) => {
    const [input, setInput] = useState('')
    return (
        <div className="flex gap-4">
            <input className="bg-amber-100 p-2 rounded-md border border-yellow-800" type="text" value={input} onChange={(e) => { setInput(e.target.value) }} />
            <button className="bg-slate-500 p-2 rounded-md" onClick={(e) => {
                e.preventDefault()
                setInput('')
                addItemHandle(input)
            }
            }>addItem</button>
        </div>
    )
}

export default AddToDo