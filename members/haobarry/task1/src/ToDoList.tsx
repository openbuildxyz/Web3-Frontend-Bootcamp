import ToDoItem from './ToDoItem'
import { store } from '@/store.ts'

export default function () {


  const {toDoList} = store()


  return (
    <div className="flex flex-col justify-center bg-amber-100 border-sky-100 shadow-md">
      {toDoList?.map((item, index) => {
        return <ToDoItem key={index} item={item} />
      })
      }

    </div>
  )
}
