import { useState, ChangeEvent } from 'react'
import type { ToDoListItem } from '@/App'
import { PlusIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface AddToDoProps {
	onAdd: (data: ToDoListItem) => void
}

// Add todo
export function AddToDo({ onAdd }: AddToDoProps) {
	const [inputValue, setInputValue] = useState('')
	
	const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}
	const handleAdd = () => {
		if(!inputValue)
			return 

		onAdd({
			id: Math.random().toString().slice(2),
			text: inputValue,
			completed: false
		})
		setInputValue('')
	}

	return (
		<div className="flex items-center gap-2">
			<div className="relative flex-1">
				<PlusIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input placeholder="Add New ToDo" className="pl-8 pr-24 placeholder-muted-foreground" value={inputValue} onChange={handleValueChange} autoFocus />
			</div>
			<Button onClick={handleAdd} disabled={!inputValue}>
				Add
			</Button>
		</div>
	)
}