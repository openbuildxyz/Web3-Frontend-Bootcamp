import type { ToDoListItem } from '@/App'
import { Separator } from '@/components/ui/separator'
import { ToDoItem } from './item'
import { TodoHeader } from './header'
import { Empty } from '@/components/empty'

interface ToDoListProps {
	data: ToDoListItem[],
	onChange: (toDo: ToDoListItem) => void,
	onRemove: (id: ToDoListItem['id']) => void
}

export function ToDoList({ data, onChange, onRemove }: ToDoListProps) {
	return (
		<div className="w-full flex flex-col px-1 gap-2">
			<TodoHeader name="ToDo" itemCount={data.length} />
			<Separator className="mb-1"  />
			{ 
				data.length 
				? 
					<div className="flex flex-col">
						{ data.map(item => <ToDoItem key={item.id} data={item} onChange={onChange} onRemove={onRemove} />) }						
					</div>
				: 
					<Empty />
			}
		</div>		
	)
}