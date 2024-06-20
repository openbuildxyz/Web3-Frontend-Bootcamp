import type { ToDoListItem } from '@/App'
import { Trash2Icon } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface RemoveProps {
	id: ToDoListItem['id'],
	onRemove: (id: ToDoListItem['id']) => void
}

export function Remove({ id, onRemove }: RemoveProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
				<Trash2Icon className="text-muted-foreground cursor-pointer hover:text-current transition-colors" size={16} /> 
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you remove sure?</AlertDialogTitle>
          <AlertDialogDescription>
						This will delete the todo and cannot be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onRemove(id)}>Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
