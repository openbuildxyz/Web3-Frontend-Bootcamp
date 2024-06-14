import {Checkbox,Chip,Button} from "@nextui-org/react";
import {useState} from "react"


export default function ToDoItem(prop:{
    index:number,
    content:string,
    complated:boolean,
    onSwitch:(id:number,complated:boolean) => void,
    onDelete:(id:number) => void,
}){
    const {index,content,complated,onSwitch,onDelete} = prop
    const [isSelected, setIsSelected] = useState(complated);
    const complatedSwitch =  (select:boolean) => {
        setIsSelected(select)
        onSwitch(index,select)
    }
    const onClick = ()=>{
        onDelete(index)
    }
    return(
        <div className="flex flex-row mx-5 border-b hover:bg-cyan-100 border-collapse" key={index}>
            <div className="basis-3/5 font-bold overflow-auto text-start py-4 px-6  text-gray-900">{content}</div>
            <div className="basis-1/5 text-start py-4 px-6  text-gray-900 self-center">
                <Chip className="capitalize " color={complated?"success":"warning"} size="sm" variant="flat">
            {complated?"complated":"pending"}
          </Chip></div>
            <div className="basis-1/5 text-start py-4 px-6  text-gray-900 self-center">
                <Checkbox defaultSelected={complated} isSelected={isSelected} color="success" onValueChange={complatedSwitch}></Checkbox>
                <Button onClick={onClick} className="ml-5">Delete</Button>
            </div>
        </div>
    )
}