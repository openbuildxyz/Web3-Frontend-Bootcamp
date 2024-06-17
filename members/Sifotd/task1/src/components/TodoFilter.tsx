function TodoFilter({setFilter}:any) {
  return (
      <div>
        <button onAuxClick={()=>setFilter('all')}>All</button>
        <button onAuxClick={()=>setFilter('active')}>Active</button>
        <button onAuxClick={()=>setFilter('completed')}>Completed</button>
      </div>
  )
}

export default TodoFilter   