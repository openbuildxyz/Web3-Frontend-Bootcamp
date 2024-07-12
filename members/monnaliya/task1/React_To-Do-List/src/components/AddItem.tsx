import { useState } from "react"

interface AddItemProps {
    addItem: (content: string) => void
}

const AddItem = ({addItem}: AddItemProps) => {
    const [content, setContent] = useState('')
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (content.trim()) {
            addItem(content)
            setContent('')
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
             />
            <button type="submit">Add Item</button>
        </form>
    )
}

export default  AddItem