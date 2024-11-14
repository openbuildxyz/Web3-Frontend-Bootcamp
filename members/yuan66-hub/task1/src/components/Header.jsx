
import { useRef } from "react"

import AddToDo from "./AddToDo"

export default function Header({ onAdd }) {
    const inputRef = useRef(null)
    const add = () => {
        const val = inputRef.current.value
        onAdd(val)
    }
    return (
        <>
            <input type="text" name="" id="" ref={inputRef} />
            <AddToDo add={add}></AddToDo>
        </>
    )
}