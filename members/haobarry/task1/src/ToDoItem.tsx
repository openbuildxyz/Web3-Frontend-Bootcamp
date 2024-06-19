import { Checkbox } from "@/components/ui/checkbox"
import { store } from "./store"
import { Button } from '@/components/ui/button.tsx'


export default function (props: any) {

  const {toDoList, setToDoList} = store()

  const changeChecked = (ev: boolean) => {
    let _index = toDoList!.findIndex(item => item.id === props.item.id)
    if (_index === -1) {
      return
    } else {
      toDoList![_index].checked = ev
      setToDoList([...toDoList!])
    }

  }


  return (
    <div className="mx-3 p-3 flex items-center border-b-[1px] border-b-gray-600 border-dashed border-black">
      <div className="text-center w-10 p-1 flex items-center justify-center">
        <Checkbox id="terms"
                  onCheckedChange={changeChecked}
                  checked={props.item.checked}
        />
      </div>
      <div className="ml-3"
           style={{textDecoration: props.item.checked ? 'line-through wavy red' : 'none'}}>
        {props.item.name}
      </div>
      <div className={"ml-auto"}>
        <Button className=" bg-red-500 size-2.5" onClick={()=>{


          setToDoList((todo: any[])=>{
            let _index = todo.findIndex((item:any) => item.id === props.item.id)
            todo.splice(_index, 1)
            return todo
          })
        }}>del</Button>
      </div>
    </div>
  )
}
