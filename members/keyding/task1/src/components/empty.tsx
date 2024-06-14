import { HandMetalIcon } from 'lucide-react'

export function Empty() {
	return (
		<div className="h-48 flex flex-col items-center justify-center gap-2">
			<div className="flex items-center gap-2">
				<HandMetalIcon size={20} className='text-muted-foreground' />
				<span className="text-sm text-muted-foreground">Hey there, don’t forget to add your to-dos!</span>
			</div>
		</div>
	)
}
