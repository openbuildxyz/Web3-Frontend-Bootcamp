import { ChangeEvent, useState, useEffect } from "react"
import { Flex, Input, Button, List } from "antd"

type Item = { // 一个待办事项
  id: number;
  content: string;
  status: 0 | 1; // 未完成 | 已完成
}

type ItemProps = {
  item: Item;
  del: (id: number)=>void;
  done: (id: number, status: 0|1)=>void;
}
function ToDoItem(props: ItemProps) {
  function updateStatus() {
    let ok = confirm("该任务是否已经完成?")
    props.done(props.item.id, ok ? 1 : 0)
  }
  return (<List.Item style={{margin: "5px"}}>
    <Flex style={{width: "100%"}} onClick={updateStatus}>
      <div style={{margin: "5px", fontSize: "20px"}}>
        {props.item.content}
      </div>
      <div style={{margin: "5px", borderBlockColor: "black", fontSize: "12px", alignContent: "center", color: props.item.status == 0 ? "red" : "green"}}>
        {props.item.status == 0 ? "未完成" : "已完成"}
      </div>
    </Flex>
    <Button onClick={()=>props.del(props.item.id)}>
        删除
    </Button>
  </List.Item>)
}

type ListProps = {
  data: Item[]
  del: (id: number)=>void
  done: (id: number, status: 0|1)=>void
}
function ToDoList(props: ListProps) {
  return (<List>
    <div style={{border: "1px solid #40D0F0", borderRadius: "10px"}}>
      {
        props.data.map((item: Item)=>(<ToDoItem key={item.id} item={item} del={props.del} done={props.done}/>))
      }
    </div>
  </List>)
}

function Header() {
  return <h1>待办事项App</h1>
}


type AddProps = { addFunc: (arg: string)=> void}
function AddToDo( props: AddProps) {
  const [text, setText] = useState("")
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setText(e.target.value)
  }
  function add() {
    if (text.length > 0) {
      props.addFunc(text)
      setText("")
    } else {
      alert("不能输入空白任务")
    }
  }

  return (<Flex>
    <Input style={{margin: "5px"}} value={text} onChange={handleInputChange} />
    <Button style={{margin: "5px", background: "#40D0F0"}} onClick={add}>添加</Button>
  </Flex>)
}



function App() {

  const [list, setList] = useState<Item[]>(()=>{
    const oldList = localStorage.getItem("list")
    if (oldList) {
      return JSON.parse(oldList)
    } else {
      return []
    }
  })

  useEffect(()=>{
    const savedList = localStorage.getItem("list")
    if (savedList) {
      setList(JSON.parse(savedList))
    } else {
      setList([])
    }
  }, [])

  useEffect(()=>{
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])

  const [nextId, setNextId] = useState(()=>{
    return list.length
  })

  function deleteItem(id: number) {
    let ok = confirm("确定要删除该任务?")
    if (ok) {
      setList(
        list.filter(item => item.id != id)
      )
    }
  }

  function modifyStatus(id: number, status: 0|1) {
    setList(list.map(item => {
      if (item.id == id) {
        item.status = status
      }
      return item
    }))
  }

  function addItem(text: string) {
    setList([
      ...list,
      {id: nextId + 1, content: text, status: 0},
    ])
    setNextId(nextId + 1)
  }

  return (<div style={{width: "60%"}}><Flex vertical>
    <Header/>
    <AddToDo addFunc={addItem} />
    <ToDoList data={list} del={deleteItem} done={modifyStatus} />
  </Flex></div>)
}

export default App