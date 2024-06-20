import { useState, ChangeEvent } from 'react'
import { PenLineIcon } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface EditProps {
	content: string
	onSave: (value: string) => void
}

export function Edit({ content, onSave }: EditProps) {
	const [ value, setValue ] = useState(content)

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}
	const handleSave = () => {
		if(!value)
			return 

		onSave(value)
	}
	const handleOpenChange = (open: boolean) => {
		if(!open && !value)
			setValue(content)
	}

	return (
		<Dialog onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<PenLineIcon className="text-muted-foreground cursor-pointer hover:text-current transition-colors" size={16} />
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Edit</DialogTitle>
				</DialogHeader>
				<div className="flex items-center space-x-2">
					<div className="grid flex-1 gap-2">
						<Input value={value} onChange={handleInputChange} />
					</div>
				</div>
				<DialogFooter className="sm:justify-end">
					<DialogClose asChild >
						<Button type="button" onClick={handleSave} disabled={!value}>
							Save
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)	
}