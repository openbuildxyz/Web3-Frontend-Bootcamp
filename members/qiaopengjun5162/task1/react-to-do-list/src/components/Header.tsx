import classes from './Header.module.css'

// Header 组件：展示应用标题。
const Header = () => {

  return (
    <div className={classes.header}>
      <h1 className={classes.title}>To Do List</h1>
    </div>
  )
}

export default Header
