import { Button } from "@/components/ui/button"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { store } from "@/store"


function Header() {


  const {toDoList, setToDoList} = store()


  const [show, setShow] = useState(false)
  const [text, setText] = useState('')


  const add = () => {
    if (!!text) {

      setToDoList([{
        id: (toDoList!.length + 1).toString(),
        name: text,
        checked: false
      },
        ...toDoList!])
      setText('')
      setShow(false)
    }else {
      alert('没有输入内容')
    }

  }

  return (
    <>
      <div className="rounded-b w-full flex text-center items-center p-2 h-20 bg-amber-200">
        <p className="ml-auto font-bold text-3xl">TO DO LIST</p>
        <div className="ml-[22%]">
          <Button variant="outline" onClick={() => setShow(true)}>新增记录</Button>
        </div>
      </div>
      <div
        className="right-1/2 translate-x-1/2 top-1/4 bg-slate-500 p-8 w-96 h-auto absolute flex flex-col items-center rounded-md"
        style={{display: show ? 'block' : 'none'}}>

        <div
          className="absolute -right-[6px] -top-[6px] bg-orange-200 rounded-full text-center border-2 border-black p-0.5 cursor-pointer"
          onClick={() => setShow(false)}>
          ✖️
        </div>


        <div className="grid w-full gap-2">
          <Textarea placeholder="请输入记录."
                    className="resize-none"
                    onChange={(e) => setText(e.target.value)}
                    value={text} />
          <Button onClick={add}>确认</Button>
        </div>
      </div>
    </>
  )
}

export default Header
