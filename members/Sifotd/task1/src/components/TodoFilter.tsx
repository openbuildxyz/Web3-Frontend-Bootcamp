function TodoFilter({serFilter}:any) {
    return (
        <div>
          <button onAuxClick={()=>serFilter('all')}>All</button>
          <button onAuxClick={()=>serFilter('active')}>Active</button>
          <button onAuxClick={()=>serFilter('completed')}>Completed</button>
        </div>
    )
}

export default TodoFilter   