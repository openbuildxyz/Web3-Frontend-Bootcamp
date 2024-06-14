interface TodoListHeaderProps {
	name: string
	itemCount: number
}

export function TodoHeader({ name, itemCount }: TodoListHeaderProps) {
	return (
		<div className="flex items-center justify-between gap-4 mt-8">
			<h4 className="text-sm font-bold leading-non">{ name }</h4>
			<span className="text-sm text-muted-foreground">{ itemCount } items</span>
		</div>
	)
}