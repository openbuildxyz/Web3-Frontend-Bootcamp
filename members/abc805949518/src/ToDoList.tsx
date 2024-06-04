import ToDoItem from './ToDoItem.tsx'
function ToDoList (props:any) {
  const {listData, setListData} = props;
  return (
    <div>
        {
          listData.map((item:any) => {
            return (
              <div key={item.id}>
                <ToDoItem item={item} setListData={setListData} listData={listData}/>
              </div>
            )
          })
        }
    </div>
  )
}

export default ToDoList 
