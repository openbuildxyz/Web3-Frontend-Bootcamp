import type { ToDoListItem } from '@/App'
import { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Edit } from './edit'
import { Remove } from './remove'

interface ToDoItemProps {
	data: ToDoListItem,
	onChange: (toDo: ToDoListItem) => void
	onRemove: (id: ToDoListItem['id']) => void
}
export function ToDoItem({ data, onChange, onRemove }: ToDoItemProps) {
	const { id, text, completed } = data
	const [active, setActive] = useState(completed)

	const handleActive = () => {
		const completed = !active

		setActive(completed)
		onChange({ id, completed, text })
	}
	const handleSave = (value: string) => {
		onChange({ id, completed, text: value })
	}

	return (
		<div className="h-10 flex items-center justify-between py-1 transition-colors hover:bg-muted rounded-lg pl-2 -mr-2 -ml-2 group">
			<div className="flex items-center gap-3">
				<Checkbox id={id} checked={active} onClick={handleActive} />
				<Label htmlFor={id} className={ `cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${active ? 'line-through' : ''}` }>
					{ text }
				</Label>
			</div> 
			<div className="hidden items-center mr-4 gap-4 group-hover:flex">
				<Edit content={text} onSave={handleSave}/>
				<Separator orientation="vertical" className="h-3 bg-muted-foreground" />
				<Remove id={id} onRemove={onRemove} />
			</div>
		</div>
	)
}