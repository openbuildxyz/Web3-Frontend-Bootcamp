import { Checkbox } from "@/components/ui/checkbox"
import clsx from "clsx"

interface Props {
  itemData: ITodoItem
  onDelete: (id: string) => void
  onCheck: (id: string, checked: boolean) => void
}

export default function ToDoItem(props: Props) {

  return <>
    <div className="flex items-center h-8 px-2 space-x-2 group hover:bg-slate-200">
      <Checkbox
        id={props.itemData.id}
        checked={props.itemData.completed}
        onCheckedChange={(checked: boolean) => props.onCheck(props.itemData.id, checked)}
      />
      <label
        htmlFor={props.itemData.id}
        className={clsx(
          { 'line-through': props.itemData.completed },
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        )}
      >
        {props.itemData.title}
      </label>
      <span
        onClick={() => props.onDelete(props.itemData.id)}
        className="invisible !ml-auto opacity-50 cursor-pointer hover:opacity-100 group-hover:visible"
      >X</span>
    </div>
  </>
}
